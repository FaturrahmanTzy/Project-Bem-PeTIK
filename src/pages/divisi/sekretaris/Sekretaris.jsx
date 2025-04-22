import React, { useState, useEffect } from 'react';
import { 
  Table, Card, Row, Col, Tag, Statistic,
  Progress, Button, message, Divider,
  Grid, Space, Typography, Badge, Breadcrumb
} from 'antd';
import { 
  CheckCircleOutlined, ClockCircleOutlined,
  FileTextOutlined, TeamOutlined,
   ReloadOutlined,
  InfoCircleOutlined, ArrowLeftOutlined,
  SolutionOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { useBreakpoint } = Grid;
const { Text, Title } = Typography;

const Sekretaris = () => {
  const [notulens, setNotulens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0
  });
  const screens = useBreakpoint();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotulens();
  }, []);

  const fetchNotulens = async () => {
    setLoading(true);

    if (!localStorage.getItem('token')) {
      message.error('Anda harus login terlebih dahulu');
      return;
    }

    try {  
      const response = await axios.get("https://profur.rikpetik.site/api/v1/sekretaris/notulen", {
        params: { bulan: "April" }
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      let notulenData = [];
      
      if (Array.isArray(response.data)) {
        notulenData = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        notulenData = response.data.data;
      }
      
      const formattedData = notulenData.map((item, index) => ({
        key: item.id || `temp-${index}-${Date.now()}`,
        id: item.id,
        bulan: item.bulan || 'Belum ditentukan',
        divisi: item.divisi || 'Umum',
        permasalahan: item.permasalahan || 'Tidak ada catatan',
        solusi: item.solusi || 'Belum ada solusi',
        terlaksana: Number(item.terlaksana) || 0,
        tgl_terlaksana: item.tgl_terlaksana || null,
        keterangan: item.keterangan || 'Tidak ada keterangan tambahan',
        status: Number(item.terlaksana) === 100 ? 'completed' : 'pending'
      }));
      
      setNotulens(formattedData);
      calculateStats(formattedData);
      message.success(`Data notulen berhasil dimuat (${formattedData.length} item)`);
    } catch (error) {
      console.error('Error:', error);
      message.error(`Gagal memuat data: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const total = data.length;
    const completed = data.filter(item => item.terlaksana === 100).length;
    const pending = total - completed;
    
    setStats({ total, completed, pending });
  };

  const columns = [
    {
      title: 'Bulan',
      dataIndex: 'bulan',
      key: 'bulan',
      render: (bulan) => (
        <Text strong>{bulan}</Text>
      ),
      sorter: (a, b) => a.bulan.localeCompare(b.bulan),
    },
    {
      title: 'Divisi',
      dataIndex: 'divisi',
      key: 'divisi',
      render: (divisi) => (
        <Tag 
          icon={<TeamOutlined />}
          color="blue"
          style={{ 
            borderRadius: 20,
            padding: '0 12px',
            margin: 0
          }}
        >
          {divisi.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'IT', value: 'IT' },
        { text: 'Keuangan', value: 'Keuangan' },
        { text: 'HRD', value: 'HRD' },
        { text: 'Umum', value: 'Umum' },
      ],
      onFilter: (value, record) => record.divisi.includes(value),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === 'completed' ? 'success' : 'warning'}
          text={status === 'completed' ? 'Selesai' : 'Pending'}
        />
      ),
      filters: [
        { text: 'Selesai', value: 'completed' },
        { text: 'Pending', value: 'pending' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Progress',
      dataIndex: 'terlaksana',
      key: 'terlaksana',
      render: (terlaksana) => (
        <Progress 
          percent={terlaksana} 
          size="small" 
          status={terlaksana === 100 ? 'success' : 'active'}
          strokeColor={terlaksana === 100 ? '#52c41a' : '#1890ff'}
        />
      ),
      sorter: (a, b) => a.terlaksana - b.terlaksana,
    },
    {
      title: 'Permasalahan',
      dataIndex: 'permasalahan',
      key: 'permasalahan',
      ellipsis: true,
      render: (text) => (
        <Text ellipsis={{ tooltip: text }} style={{ maxWidth: 200 }}>
          {text}
        </Text>
      ),
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<InfoCircleOutlined />}
            onClick={() => showNotulenDetail(record)}
            size="small"
          />
          <Button 
            type="default" 
            icon={<SolutionOutlined />}
            onClick={() => navigate(`/notulen/edit/${record.id}`)}
            size="small"
          />
        </Space>
      ),
    },
  ];

  const showNotulenDetail = (record) => {
    Modal.info({
      title: 'Detail Notulen',
      width: 800,
      content: (
        <div>
          <Row gutter={16}>
            <Col span={8}>
              <Card bordered={false}>
                <Statistic
                  title="Divisi"
                  value={record.divisi}
                  prefix={<TeamOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <Statistic
                  title="Status"
                  value={record.status === 'completed' ? 'Selesai' : 'Pending'}
                  valueStyle={{ color: record.status === 'completed' ? '#52c41a' : '#faad14' }}
                  prefix={record.status === 'completed' ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <Statistic
                  title="Progress"
                  value={record.terlaksana}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
          <Divider />
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Bulan">{record.bulan}</Descriptions.Item>
            <Descriptions.Item label="Permasalahan">
              <Text>{record.permasalahan}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Solusi">
              <Text>{record.solusi}</Text>
            </Descriptions.Item>
            {record.tgl_terlaksana && (
              <Descriptions.Item label="Tanggal Terlaksana">
                {new Date(record.tgl_terlaksana).toLocaleDateString('id-ID')}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Keterangan">
              <Text>{record.keterangan}</Text>
            </Descriptions.Item>
          </Descriptions>
        </div>
      ),
      okText: 'Tutup',
    });
  };

  const completionPercentage = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <div style={{ padding: screens.xs ? '16px' : '24px' }}>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Space>
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate(-1)}
              style={{ marginRight: 16 }}
              className='bg-primary text-white'
            >
              Kembali
            </Button>
            <Title level={4} style={{ margin: 0 }}>
              <FileTextOutlined style={{ color: '#1890ff', marginRight: 8 }} />
              Manajemen Notulen
            </Title>
          </Space>
          <Divider style={{ margin: '12px 0' }} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} justify="space-between" style={{ marginBottom: 24 }}>
        <Col>
          <Breadcrumb>
            <Breadcrumb.Item>
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Sekretaris</Breadcrumb.Item>
            <Breadcrumb.Item>Notulen</Breadcrumb.Item>
          </Breadcrumb>
        </Col>
        <Col>
          <Button 
            type="primary" 
            icon={<ReloadOutlined />}
            onClick={fetchNotulens}
            loading={loading}
          >
            Refresh
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false}>
            <Statistic
              title="Total Notulen"
              value={stats.total}
              precision={0}
              valueStyle={{ color: '#1890ff' }}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false}>
            <Statistic
              title="Selesai"
              value={stats.completed}
              precision={0}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false}>
            <Statistic
              title="Pending"
              value={stats.pending}
              precision={0}
              valueStyle={{ color: '#faad14' }}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="Progress Penyelesaian"
        bordered={false}
        style={{ marginBottom: 24 }}
        extra={
          <Text type="secondary">
            Update: {new Date().toLocaleDateString('id-ID')}
          </Text>
        }
      >
        <Progress 
          percent={completionPercentage}
          strokeColor={{
            '0%': '#faad14',
            '100%': '#52c41a',
          }}
          format={(percent) => (
            <Text strong style={{ color: percent === 100 ? '#52c41a' : '#faad14' }}>
              {percent}% Terselesaikan
            </Text>
          )}
        />
      </Card>

      <Card
        title="Daftar Notulen"
        bordered={false}
        loading={loading}
        extra={
          <Text type="secondary">
            Total: {notulens.length} notulen
          </Text>
        }
      >
        <Table 
          columns={columns} 
          dataSource={notulens} 
          rowKey="key"
          pagination={{ 
            pageSize: 5,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} notulen`
          }}
          scroll={{ x: true }}
          expandable={{
            expandedRowRender: record => (
              <div style={{ padding: 16, background: '#fafafa' }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Title level={5} style={{ marginTop: 0 }}>Detail Permasalahan</Title>
                    <Text>{record.permasalahan}</Text>
                  </Col>
                  <Col span={12}>
                    <Title level={5} style={{ marginTop: 0 }}>Solusi</Title>
                    <Text>{record.solusi}</Text>
                  </Col>
                </Row>
                <Divider />
                <Row gutter={16}>
                  <Col span={12}>
                    <Title level={5}>Keterangan</Title>
                    <Text>{record.keterangan}</Text>
                  </Col>
                  {record.tgl_terlaksana && (
                    <Col span={12}>
                      <Title level={5}>Tanggal Terlaksana</Title>
                      <Text>{new Date(record.tgl_terlaksana).toLocaleDateString('id-ID')}</Text>
                    </Col>
                  )}
                </Row>
              </div>
            ),
            rowExpandable: record => true,
          }}
        />
      </Card>
    </div>
  );
};

export default Sekretaris;