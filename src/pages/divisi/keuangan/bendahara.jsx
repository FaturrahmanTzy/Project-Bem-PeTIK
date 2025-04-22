import React, { useState, useEffect } from 'react';
import { 
  Table, Card, Row, Col, Tag, Statistic,
  Progress, Button, message, Divider,
  Grid, Space, Typography
} from 'antd';
import { 
  ArrowUpOutlined, ArrowDownOutlined,
  WalletOutlined, InfoCircleOutlined,
  PieChartOutlined, ReloadOutlined,
} from '@ant-design/icons';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const { useBreakpoint } = Grid;
const { Text } = Typography;

const Bendahara = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    pemasukan: 0,
    pengeluaran: 0,
    saldo: 0
  });
    const navigate = useNavigate();
  const screens = useBreakpoint();

  useEffect(() => {
    fetchTransactions();
  }, []);
  const fetchTransactions = async () => {
    setLoading(true);
    // Tambahkan di awal fetchTransactions (hanya untuk development)
if (process.env.NODE_ENV === 'development') {
    const mockData = [
      {
        id: 1,
        tanggal: new Date().toISOString(),
        tipe: 'pemasukan',
        jumlah: 500000,
        kas_sekarang: 500000,
        keterangan: 'Mock pemasukan'
      },
      {
        id: 2,
        tanggal: new Date().toISOString(),
        tipe: 'pengeluaran',
        jumlah: 200000,
        kas_sekarang: 300000,
        keterangan: 'Mock pengeluaran'
      }
    ];
    
    setTransactions(mockData);
    calculateStats(mockData);
    setLoading(false);
    return;
  }
    try {
      const response = await axios.get('https://profur.rikpetik.site/api/v1/kas', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      console.log('Full API Response:', response);
      
      // Handle minimal response { kas_sekarang: number }
      if (response.data && typeof response.data === 'object' && 'kas_sekarang' in response.data) {
        const saldo = Number(response.data.kas_sekarang) || 0;
        
        setTransactions([]); // Set transaksi kosong
        setStats({
          pemasukan: 0,
          pengeluaran: 0,
          saldo: saldo
        });
        
        message.info('Hanya data saldo yang tersedia');
        return;
      }
      
      // Handle jika ada data transaksi (format lama)
      let transactionData = [];
      if (Array.isArray(response.data)) {
        transactionData = response.data;
      } else if (response.data?.data) {
        transactionData = response.data.data;
      }
      
      const formattedData = transactionData.map((item) => ({
        id: item.id || Math.random().toString(36).substr(2, 9),
        tanggal: item.tanggal || new Date().toISOString(),
        tipe: item.tipe?.toLowerCase() === 'pengeluaran' ? 'pengeluaran' : 'pemasukan',
        jumlah: Math.abs(Number(item.jumlah)) || 0,
        kas_sekarang: Number(item.kas_sekarang) || 0,
        keterangan: item.keterangan || 'Tidak ada keterangan'
      }));
      
      setTransactions(formattedData);
      calculateStats(formattedData);
      
    } catch (error) {
      console.error('Error:', error);
      message.error(`Gagal memuat data: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const pemasukan = data
      .filter(item => item.tipe === 'pemasukan')
      .reduce((sum, item) => sum + item.jumlah, 0);
    
    const pengeluaran = data
      .filter(item => item.tipe === 'pengeluaran')
      .reduce((sum, item) => sum + item.jumlah, 0);
    
    // Get current balance from the last transaction or default to 0
    const lastTransaction = data[data.length - 1];
    const saldo = lastTransaction?.kas_sekarang || 0;
    
    setStats({ pemasukan, pengeluaran, saldo });
  };
  

  // Rest of your component remains the same...
  const columns = [
    {
      title: 'Tanggal',
      dataIndex: 'tanggal',
      key: 'tanggal',
      render: (date) => new Date(date).toLocaleDateString('id-ID'),
      sorter: (a, b) => new Date(a.tanggal) - new Date(b.tanggal),
    },
    {
      title: 'Jenis Transaksi',
      dataIndex: 'tipe',
      key: 'tipe',
      render: (tipe) => (
        <Tag 
          icon={tipe === 'pemasukan' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          color={tipe === 'pemasukan' ? 'green' : 'red'}
          style={{ 
            borderRadius: 20,
            padding: '0 12px',
            margin: 0
          }}
        >
          {tipe.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Pemasukan', value: 'pemasukan' },
        { text: 'Pengeluaran', value: 'pengeluaran' },
      ],
      onFilter: (value, record) => record.tipe === value,
    },
    {
      title: 'Jumlah',
      dataIndex: 'jumlah',
      key: 'jumlah',
      render: (jumlah, record) => (
        <Text 
          strong 
          type={record.tipe === 'pemasukan' ? 'success' : 'danger'}
        >
          {record.tipe === 'pemasukan' ? '+' : '-'}Rp{jumlah.toLocaleString('id-ID')}
        </Text>
      ),
      sorter: (a, b) => a.jumlah - b.jumlah,
    },
    {
      title: 'Keterangan',
      dataIndex: 'keterangan',
      key: 'keterangan',
      ellipsis: true,
    },
    {
      title: 'Saldo Kas',
      dataIndex: 'kas_sekarang',
      key: 'kas_sekarang',
      render: (kas) => `Rp${kas.toLocaleString('id-ID')}`,
      sorter: (a, b) => a.kas_sekarang - b.kas_sekarang,
    },
    {
      title: 'Detail',
      key: 'detail',
      render: (_, record) => (
        <Button 
          type="text" 
          icon={<InfoCircleOutlined />}
          onClick={() => message.info(`Detail transaksi: ${record.keterangan || 'Tidak ada keterangan tambahan'}`)}
        />
      ),
    },
  ];

  const pemasukanPercentage = stats.pemasukan + stats.pengeluaran > 0 
    ? Math.round((stats.pemasukan / (stats.pemasukan + stats.pengeluaran)) * 100) 
    : 0;
  return (
    <div style={{ padding: screens.xs ? '16px' : '24px' }}>
        <Button 
        variant="outline-secondary" 
        onClick={() => navigate(-1)}
        className="mb-4 d-flex align-items-center bg-primary text-white border-0 shadow-sm"
        >
        <FaArrowLeft className="me-2" />
        Kembali
        </Button>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <h1 style={{ 
            margin: 0,
            fontSize: screens.xs ? '20px' : '24px',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <WalletOutlined style={{ color: '#1890ff' }} />
            <span>Manajemen Keuangan</span>
          </h1>
        </Col>
        <Col>
          <Button 
            type="primary" 
            icon={<ReloadOutlined />}
            onClick={fetchTransactions}
            style={{ 
              borderRadius: 8,
              background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
              border: 'none',
              boxShadow: '0 2px 8px rgba(24, 144, 255, 0.3)'
            }}
          >
            Refresh Data
          </Button>
        </Col>
      </Row>

      <Divider style={{ margin: '16px 0' }} />

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable>
            <Statistic
              title="Total Pemasukan"
              value={stats.pemasukan}
              precision={0}
              valueStyle={{ color: '#52c41a', fontSize: '28px' }}
              prefix={<ArrowUpOutlined style={{ color: '#52c41a' }} />}
              suffix="Rp"
              formatter={(value) => value.toLocaleString('id-ID')}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable>
            <Statistic
              title="Total Pengeluaran"
              value={stats.pengeluaran}
              precision={0}
              valueStyle={{ color: '#f5222d', fontSize: '28px' }}
              prefix={<ArrowDownOutlined style={{ color: '#f5222d' }} />}
              suffix="Rp"
              formatter={(value) => value.toLocaleString('id-ID')}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card hoverable>
            <Statistic
              title="Saldo Kas"
              value={stats.saldo}
              precision={0}
              valueStyle={{ 
                color: stats.saldo >= 0 ? '#1890ff' : '#f5222d', 
                fontSize: '28px' 
              }}
              prefix={<WalletOutlined style={{ 
                color: stats.saldo >= 0 ? '#1890ff' : '#f5222d' 
              }} />}
              suffix="Rp"
              formatter={(value) => value.toLocaleString('id-ID')}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title={
          <Space>
            <PieChartOutlined />
            <span>Rasio Pemasukan vs Pengeluaran</span>
          </Space>
        }
        style={{ marginBottom: 24 }}
        tyles={{ body: { padding: '16px 24px' } }}
      >
        <Progress 
          percent={pemasukanPercentage}
          success={{ percent: 100 - pemasukanPercentage }}
          strokeColor={{
            '0%': '#52c41a',
            '100%': '#f5222d',
          }}
          format={() => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Rasio Keuangan</span>
              <strong>
                {pemasukanPercentage}% Pemasukan | {100 - pemasukanPercentage}% Pengeluaran
              </strong>
            </div>
          )}
        />
      </Card>

      <Card
            title="Daftar Transaksi"
            loading={loading}
            extra={
                <Text type="secondary">
                {transactions.length > 0 ? `Total ${transactions.length} transaksi` : 'Tidak ada transaksi'}
                </Text>
            }
            >
            {transactions.length > 0 ? (
                <Table 
                columns={columns}
                dataSource={transactions}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                />
            ) : (
                <div style={{ padding: '16px', textAlign: 'center' }}>
                <Text type="secondary">Tidak ada data transaksi yang tersedia</Text>
                </div>
            )}
            </Card>
    </div>
  );
};

export default Bendahara;