import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Card, 
  Row, 
  Col, 
  Select, 
  DatePicker, 
  Statistic,
  Progress,
  message,
  Alert
  
} from 'antd';
import { 
  BookOutlined, 
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';



const { Option } = Select;

const Pendidikan = () => {
  const [absenData, setAbsenData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mataKuliahList, setMataKuliahList] = useState([]);
  const [selectedMataKuliah, setSelectedMataKuliah] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(moment().format('YYYY-MM'));
  const [stats, setStats] = useState({
    total: 0,
    hadir: 0,
    sakit: 0,
    izin: 0,
    absen: 0
  });
  const [error, setError] = useState(null);

  // Fungsi untuk mendapatkan token dengan pengecekan
  const getAuthToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Anda belum login. Silakan login terlebih dahulu.');
      return null;
    }
    return token;
  };

  useEffect(() => {
    fetchMataKuliah();
  }, []);

  useEffect(() => {
    if (mataKuliahList.length > 0) {
      fetchAbsenData();
    }
  }, [selectedMataKuliah, selectedMonth, mataKuliahList]);

  const fetchMataKuliah = async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      const response = await axios.get('https://profur.rikpetik.site/api/v1/pendidikan/matkul', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setMataKuliahList(response.data);
    
      if (response.data.length > 0) {
        setSelectedMataKuliah(response.data[0].id);
      }
    } catch (error) {
      console.error('Error fetching mata kuliah:', error);
      if (error.response?.status === 401) {
        setError('Sesi Anda telah berakhir. Silakan login kembali.');
      } else {
        setError('Gagal memuat data mata kuliah. Silakan coba lagi.');
      }
    }
  };

  const fetchAbsenData = async () => {
    const token = getAuthToken();
    if (!token) return;

    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`https://profur.rikpetik.site/api/v1/pendidikan/rekap/${selectedMonth}`, {
        params: {
          mataKuliahId: selectedMataKuliah
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAbsenData(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error('Error fetching absen data:', error);
      if (error.response?.status === 401) {
        setError('Sesi Anda telah berakhir. Silakan login kembali.');
      } else {
        setError('Gagal memuat data absensi. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '24px' }}>
        <BookOutlined /> Monitoring Kehadiran Mahasiswa
      </h1>
      
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: '24px' }}
          closable
          onClose={() => setError(null)}
        />
      )}
      
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col span={24}>
          <Card>
            <Row gutter={16}>
              <Col span={12}>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Pilih Mata Kuliah"
                  value={selectedMataKuliah}
                  onChange={setSelectedMataKuliah}
                  loading={mataKuliahList.length === 0}
                >
                  {Array.isArray(mataKuliahList) && mataKuliahList.map(mk => (
                    <Option key={mk.id} value={mk.id}>{mk.nama}</Option>
                  ))}
                </Select>
              </Col>
              <Col span={12}>
                <DatePicker 
                  style={{ width: '100%' }}
                  picker="month" 
                  format="MMMM YYYY"
                  value={moment(selectedMonth, 'YYYY-MM')}
                  onChange={(date, dateString) => setSelectedMonth(dateString)}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Kehadiran"
              value={stats.total}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Hadir"
              value={stats.hadir}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Sakit/Izin"
              value={stats.sakit + stats.izin}
              valueStyle={{ color: '#faad14' }}
              prefix={<ExclamationCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Absen"
              value={stats.absen}
              valueStyle={{ color: '#f5222d' }}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Pendidikan;