import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Card, 
  Row, 
  Col, 
  Tag, 
  Statistic,
  Progress,
  Space,
  Button,
  Avatar,
  Divider,
  Badge,
  Calendar,
  Select,
  Tooltip,
  message
} from 'antd';
import { 
  TeamOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ArrowLeftOutlined,
  UserOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const Piket = () => {
  const [piketData, setPiketData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    bersih: 0,
    kotor: 0
  });
  const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYY-MM'));
  const navigate = useNavigate();

  // Data dummy untuk simulasi API
  const dummyData = [
    {
      id: 1,
      tanggal: '2023-10-05',
      tempat: 'Ruang Kelas A',
      nilai: 'Bersih',
      user: {
        id: 101,
        nama: 'John Doe',
        foto: null
      }
    },
    {
      id: 2,
      tanggal: '2023-10-12',
      tempat: 'Ruang Guru',
      nilai: 'Kotor',
      user: {
        id: 102,
        nama: 'Jane Smith',
        foto: null
      }
    },
    {
      id: 3,
      tanggal: '2023-10-19',
      tempat: 'Perpustakaan',
      nilai: 'Bersih',
      user: {
        id: 103,
        nama: 'Bob Johnson',
        foto: null
      }
    },
    {
      id: 4,
      tanggal: '2023-10-26',
      tempat: 'Laboratorium',
      nilai: 'Bersih',
      user: {
        id: 104,
        nama: 'Alice Williams',
        foto: null
      }
    }
  ];

  useEffect(() => {
    // Gunakan data dummy jika API error
    try {
      fetchPiketData();
    } catch (error) {
      console.error('Error fetching data, using dummy data instead:', error);
      setPiketData(dummyData);
      calculateStats(dummyData);
    }
  }, [selectedMonth]);

  const fetchPiketData = async () => {
    setLoading(true);
    try {
      // Coba gunakan HTTP jika HTTPS bermasalah
      const apiUrl = window.location.hostname === 'localhost' 
        ? 'http://profur.rikpetik.site/api/v1/kebersihan/tempat'
        : 'https://profur.rikpetik.site/api/v1/kebersihan/tempat';

      const response = await axios.get(apiUrl, {
        params: { bulan: selectedMonth },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      const data = Array.isArray(response.data) ? response.data : dummyData;
      setPiketData(data);
      calculateStats(data);
    } catch (error) {
      console.error('Error fetching data, using dummy data instead:', error);
      setPiketData(dummyData);
      calculateStats(dummyData);
      message.warning('Menggunakan data contoh karena koneksi bermasalah');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const dataArray = Array.isArray(data) ? data : [];
    const newStats = {
      total: dataArray.length,
      bersih: dataArray.filter(item => item.nilai === 'Bersih').length,
      kotor: dataArray.filter(item => item.nilai === 'Kotor').length
    };
    setStats(newStats);
  };

  const columns = [
    {
      title: 'Tanggal',
      dataIndex: 'tanggal',
      key: 'tanggal',
      render: (date) => moment(date).format('DD MMM YYYY'),
      sorter: (a, b) => new Date(a.tanggal) - new Date(b.tanggal),
    },
    {
      title: 'Petugas',
      dataIndex: 'user',
      key: 'user',
      render: (user) => (
        <Space>
          <Avatar 
            src={user?.foto} 
            icon={<UserOutlined />}
            style={{ backgroundColor: '#1890ff' }}
          />
          <span>{user?.nama || 'Petugas Piket'}</span>
        </Space>
      ),
    },
    {
      title: 'Lokasi',
      dataIndex: 'tempat',
      key: 'tempat',
      render: (tempat) => (
        <Space>
          <EnvironmentOutlined style={{ color: '#1890ff' }} />
          <span>{tempat}</span>
        </Space>
      ),
    },
    {
      title: 'Kondisi',
      dataIndex: 'nilai',
      key: 'nilai',
      render: (nilai) => (
        <Tag 
          icon={nilai === 'Bersih' ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
          color={nilai === 'Bersih' ? 'green' : 'red'}
          style={{ 
            borderRadius: 20,
            padding: '0 12px',
            margin: 0
          }}
        >
          {nilai.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Bersih', value: 'Bersih' },
        { text: 'Kotor', value: 'Kotor' },
      ],
      onFilter: (value, record) => record.nilai === value,
    },
    {
      title: 'Detail',
      key: 'detail',
      render: (_, record) => (
        <Tooltip title="Lihat detail">
          <Button 
            type="text" 
            icon={<InfoCircleOutlined />}
            onClick={() => message.info(`Detail piket tanggal ${moment(record.tanggal).format('DD MMM YYYY')}`)}
          />
        </Tooltip>
      ),
    },
  ];

  const cellRender = (current, info) => {
    if (info.type === 'date') {
      const dateStr = current.format('YYYY-MM-DD');
      const dataOnDate = Array.isArray(piketData) 
        ? piketData.filter(item => moment(item.tanggal).format('YYYY-MM-DD') === dateStr)
        : [];
      
      if (dataOnDate.length > 0) {
        return (
          <div style={{ margin: '4px' }}>
            {dataOnDate.map((item, index) => (
              <div key={index} style={{ marginBottom: 4 }}>
                <Badge 
                  color={item.nilai === 'Bersih' ? 'green' : 'red'} 
                  text={
                    <span style={{ fontSize: 12 }}>
                      {item.tempat} - {item.user?.nama || 'Petugas'}
                    </span>
                  } 
                />
              </div>
            ))}
          </div>
        );
      }
    }
    return null;
  };

  const kebersihanPercentage = stats.total > 0 
    ? Math.round((stats.bersih / stats.total) * 100) 
    : 0;

  return (
    <div style={{ padding: '24px' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Space>
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate(-1)}
            />
            <h1 style={{ margin: 0 }}>
              <TeamOutlined style={{ color: '#1890ff', marginRight: 12 }} />
              Jadwal Piket Kebersihan
            </h1>
          </Space>
        </Col>
        <Col>
          <Select
            style={{ width: 200 }}
            placeholder="Pilih Bulan"
            value={selectedMonth}
            onChange={setSelectedMonth}
            suffixIcon={<CalendarOutlined />}
          >
            {Array.from({ length: 12 }, (_, i) => {
              const month = moment().subtract(i, 'months');
              return (
                <Option key={month.format('YYYY-MM')} value={month.format('YYYY-MM')}>
                  {month.format('MMMM YYYY')}
                </Option>
              );
            })}
          </Select>
        </Col>
      </Row>

      <Divider style={{ margin: '16px 0' }} />

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable>
            <Statistic
              title="Total Piket"
              value={stats.total}
              prefix={<TeamOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ fontSize: '28px' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable>
            <Statistic
              title="Kondisi Bersih"
              value={stats.bersih}
              valueStyle={{ color: '#52c41a', fontSize: '28px' }}
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card hoverable>
            <Statistic
              title="Kondisi Kotor"
              value={stats.kotor}
              valueStyle={{ color: '#f5222d', fontSize: '28px' }}
              prefix={<CloseCircleOutlined style={{ color: '#f5222d' }} />}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title={
          <Space>
            <CalendarOutlined />
            <span>Ringkasan Kebersihan</span>
          </Space>
        }
        style={{ marginBottom: 24 }}
        styles={{ body: { padding: '16px 24px' } }}
      >
        <Progress 
          percent={kebersihanPercentage}
          status={kebersihanPercentage >= 80 ? 'success' : kebersihanPercentage >= 50 ? 'normal' : 'exception'}
          strokeColor={{
            '0%': '#f5222d',
            '100%': '#52c41a',
          }}
          format={() => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Tingkat Kebersihan</span>
              <strong>{stats.bersih}/{stats.total} ({kebersihanPercentage}%) dalam kondisi bersih</strong>
            </div>
          )}
        />
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card
            title="Kalendar Piket"
            styles={{ body: { padding: 8 } }}
          >
            <Calendar 
              cellRender={cellRender}
              mode="month"
              onPanelChange={(date) => setSelectedMonth(date.format('YYYY-MM'))}
              value={moment(selectedMonth)}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title="Daftar Piket"
            loading={loading}
            styles={{ body: { padding: 16 } }}
          >
            <Table 
              columns={columns} 
              dataSource={piketData} 
              rowKey="id"
              pagination={{ 
                pageSize: 5,
                showSizeChanger: false,
                showTotal: (total) => `Total ${total} jadwal piket`
              }}
              scroll={{ x: true }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Piket;