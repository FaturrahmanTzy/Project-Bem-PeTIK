import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Card, 
  Row, 
  Col, 
  Tag, 
  Statistic,
  Progress,
  Badge,
  Space,
  Button,
  message,
  Divider,
  Avatar,
  Grid
} from 'antd';
import { 
  ToolOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  DashboardOutlined,
  
} from '@ant-design/icons';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { useBreakpoint } = Grid;

const Kebersihan = () => {
  const [alatKebersihan, setAlatKebersihan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    baik: 0,
    ringan: 0,
    berat: 0
  });
  const navigate = useNavigate();
  const screens = useBreakpoint();

  useEffect(() => {
    fetchAlatKebersihan();
  }, []);

  const fetchAlatKebersihan = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://profur.rikpetik.site/api/v1/kebersihan/data_alat', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setAlatKebersihan(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error('Error fetching data alat kebersihan:', error);
      message.error('Gagal memuat data alat kebersihan');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const newStats = {
      total: data.length,
      baik: data.filter(item => item.kondisi === 'baik').length,
      ringan: data.filter(item => item.kondisi === 'rusak ringan').length,
      berat: data.filter(item => item.kondisi === 'rusak berat').length
    };
    setStats(newStats);
  };

  const columns = [
    {
      title: 'Alat Kebersihan',
      dataIndex: 'nama_alat',
      key: 'nama_alat',
      render: (text, record) => (
        <Space>
          <Avatar 
            style={{ 
              backgroundColor: getAvatarColor(record.kondisi),
              color: '#fff'
            }}
          >
            {text.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600 }}>{text}</div>
            <div style={{ fontSize: 12, color: '#888' }}>
              Stok: <strong>{record.stok}</strong>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Kondisi',
      dataIndex: 'kondisi',
      key: 'kondisi',
      render: (kondisi) => (
        <Tag 
          icon={getConditionIcon(kondisi)} 
          color={getConditionColor(kondisi)}
          style={{ 
            borderRadius: 20,
            padding: '0 12px',
            margin: 0
          }}
        >
          {kondisi.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Baik', value: 'baik' },
        { text: 'Rusak Ringan', value: 'rusak ringan' },
        { text: 'Rusak Berat', value: 'rusak berat' },
      ],
      onFilter: (value, record) => record.kondisi === value,
    },
    {
      title: 'Ketersediaan',
      dataIndex: 'stok',
      key: 'stok',
      render: (stok) => (
        <Progress 
          percent={(stok / 20) * 100} 
          showInfo={false}
          strokeColor={getStockColor(stok)}
          style={{ margin: 0 }}
        />
      ),
      sorter: (a, b) => a.stok - b.stok,
    },
    {
      title: 'Detail',
      key: 'detail',
      render: (_, record) => (
        <Button 
          type="text" 
          icon={<InfoCircleOutlined />}
          onClick={() => message.info(`Detail ${record.nama_alat}: ${record.keterangan || 'Tidak ada keterangan tambahan'}`)}
        />
      ),
    },
  ];

  // Helper functions
  const getConditionIcon = (kondisi) => {
    switch(kondisi) {
      case 'baik': return <CheckCircleOutlined />;
      case 'rusak ringan': return <WarningOutlined />;
      case 'rusak berat': return <CloseCircleOutlined />;
      default: return <InfoCircleOutlined />;
    }
  };

  const getConditionColor = (kondisi) => {
    switch(kondisi) {
      case 'baik': return '#52c41a';
      case 'rusak ringan': return '#faad14';
      case 'rusak berat': return '#f5222d';
      default: return '#d9d9d9';
    }
  };

  const getStockColor = (stok) => {
    if (stok > 10) return '#52c41a';
    if (stok > 5) return '#faad14';
    return '#f5222d';
  };

  const getAvatarColor = (kondisi) => {
    switch(kondisi) {
      case 'baik': return '#87d068';
      case 'rusak ringan': return '#fa8c16';
      case 'rusak berat': return '#f5222d';
      default: return '#1890ff';
    }
  };

  const kondisiPercentage = stats.total > 0 
    ? Math.round((stats.baik / stats.total) * 100) 
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
            <ToolOutlined style={{ color: '#1890ff' }} />
            <span>Manajemen Alat Kebersihan</span>
          </h1>
        </Col>
        <Col>
          <Button 
            type="primary" 
            icon={<TeamOutlined />}
            onClick={() => navigate('/divisi/kebersihan/piket`')}
            style={{ 
              borderRadius: 8,
              background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
              border: 'none',
              boxShadow: '0 2px 8px rgba(24, 144, 255, 0.3)'
            }}
          >
            Lihat Jadwal Piket
          </Button>
        </Col>
      </Row>

      <Divider style={{ margin: '16px 0' }} />

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable>
            <Statistic
              title="Total Alat"
              value={stats.total}
              prefix={<ToolOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ fontSize: '28px' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable>
            <Statistic
              title="Kondisi Baik"
              value={stats.baik}
              valueStyle={{ color: '#52c41a', fontSize: '28px' }}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable>
            <Statistic
              title="Rusak Ringan"
              value={stats.ringan}
              valueStyle={{ color: '#faad14', fontSize: '28px' }}
              prefix={<WarningOutlined style={{ color: '#faad14' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable>
            <Statistic
              title="Rusak Berat"
              value={stats.berat}
              valueStyle={{ color: '#f5222d', fontSize: '28px' }}
              prefix={<CloseCircleOutlined style={{ color: '#f5222d' }} />}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title={
          <Space>
            <DashboardOutlined />
            <span>Ringkasan Kondisi Alat</span>
          </Space>
        }
        style={{ marginBottom: 24 }}
        bodyStyle={{ padding: '16px 24px' }}
      >
        <Progress 
          percent={kondisiPercentage}
          status={kondisiPercentage >= 80 ? 'success' : kondisiPercentage >= 50 ? 'normal' : 'exception'}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          format={() => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Kondisi Alat</span>
              <strong>{stats.baik}/{stats.total} ({kondisiPercentage}%) dalam kondisi baik</strong>
            </div>
          )}
        />
      </Card>

      <Card
        title="Inventaris Alat Kebersihan"
        loading={loading}
        bodyStyle={{ padding: screens.xs ? '12px' : '16px' }}
      >
        <Table 
          columns={columns} 
          dataSource={alatKebersihan} 
          rowKey="id"
          pagination={{ 
            pageSize: 5,
            showSizeChanger: false,
            showTotal: (total) => `Total ${total} alat`
          }}
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
};

export default Kebersihan;