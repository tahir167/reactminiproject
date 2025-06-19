import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid'; 
import { Button, Select, MenuItem, FormControl, InputLabel, Tooltip } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import controller from '../../services/requests/productsRequest'; 
import { endpoints } from '../../constants'; 

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await controller.getAll(endpoints.users);
      setUsers(fetchedUsers);
    } catch (err) {
      console.error("İstifadəçiləri gətirmək alınmadı:", err);
      setError("İstifadəçilər yüklənərkən xəta baş verdi.");
      enqueueSnackbar("İstifadəçiləri yükləmək mümkün olmadı.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleBanUser = async (userId, duration) => {
    const userToBan = users.find(user => user.id === userId);
    if (!userToBan) {
      enqueueSnackbar("İstifadəçi tapılmadı.", { variant: "error" });
      return;
    }

    let banUntil = null;
    const now = new Date();

    switch (duration) {
      case "1_week":
        banUntil = new Date(now.setDate(now.getDate() + 7));
        break;
      case "2_weeks":
        banUntil = new Date(now.setDate(now.getDate() + 14));
        break;
      case "1_month":
        banUntil = new Date(now.setMonth(now.getMonth() + 1));
        break;
      case "permanent":
        banUntil = "permanent";
        break;
      default:
        enqueueSnackbar("Zəhmət olmasa ban müddətini seçin.", { variant: "warning" });
        return;
    }

    try {
      const updatedUser = {
        ...userToBan,
        isBanned: true,
        banDuration: duration,
        banUntil: banUntil === "permanent" ? "permanent" : banUntil.toISOString(),
        bannedAt: new Date().toISOString(),
      };

      await controller.update(endpoints.users, userId, updatedUser);
      enqueueSnackbar(`${userToBan.fullName} müvəffəqiyyətlə ban edildi.`, { variant: "success" });
      fetchUsers();
    } catch (err) {
      console.error("İstifadəçini ban etmək alınmadı:", err);
      enqueueSnackbar("İstifadəçini ban edərkən xəta baş verdi.", { variant: "error" });
    }
  };

  const handleUnbanUser = async (userId) => {
    const userToUnban = users.find(user => user.id === userId);
    if (!userToUnban) {
      enqueueSnackbar("İstifadəçi tapılmadı.", { variant: "error" });
      return;
    }

    try {
      const updatedUser = {
        ...userToUnban,
        isBanned: false,
        banDuration: null,
        banUntil: null,
        bannedAt: null,
      };

      await controller.update(endpoints.users, userId, updatedUser);
      enqueueSnackbar(`${userToUnban.fullName} müvəffəqiyyətlə ban'dan çıxarıldı.`, { variant: "success" });
      fetchUsers();
    } catch (err) {
      console.error("İstifadəçini ban'dan çıxarmaq alınmadı:", err);
      enqueueSnackbar("İstifadəçini ban'dan çıxararkən xəta baş verdi.", { variant: "error" });
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'fullName', headerName: 'Tam Adı', width: 200, editable: false },
    { field: 'email', headerName: 'Email', width: 200, editable: false },
    { field: 'phone', headerName: 'Telefon', width: 150, editable: false },
    {
      field: 'role',
      headerName: 'Rol',
      width: 100,
      editable: false,
      renderCell: (params) => {
        let roleText = '';
        if (params.value === 'admin') {
          roleText = 'Admin';
        } else if (params.value === 'client') {
          roleText = 'Müştəri';
        } else {
          roleText = params.value;
        }

        const isBanned = params.row.isBanned;
        const banUntil = params.row.banUntil;

        if (isBanned) {
          if (banUntil === "permanent") {
            return <Tooltip title="Bu istifadəçi daimi banlanıb."><span className="text-red-600 font-bold">{roleText} (Banlı Daimi)</span></Tooltip>;
          } else if (banUntil && new Date(banUntil) > new Date()) {
            const banDate = new Date(banUntil).toLocaleDateString('az-AZ', { day: '2-digit', month: '2-digit', year: 'numeric' });
            return <Tooltip title={`Bu istifadəçi ${banDate} tarixinə qədər banlanıb.`}><span className="text-orange-600 font-bold">{roleText} (Banlı)</span></Tooltip>;
          } else {
            return <span className="text-green-600 font-bold">{roleText} (Aktiv)</span>;
          }
        }
        return <span className="text-green-600 font-bold">{roleText} (Aktiv)</span>;
      }
    },
    {
      field: 'registeredAt',
      headerName: 'Qeydiyyat Tarixi',
      width: 150,
      editable: false,
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString('az-AZ') : '';
      },
    },
    {
      field: 'actions',
      headerName: 'Əməliyyatlar',
      width: 250,
      sortable: false,
      renderCell: (params) => {
        const isBanned = params.row.isBanned;
        const [banDuration, setBanDuration] = useState('');

        const handleDurationChange = (event) => {
          setBanDuration(event.target.value);
        };

        const banExpired = isBanned && params.row.banUntil && params.row.banUntil !== "permanent" && new Date(params.row.banUntil) <= new Date();

        if (isBanned && !banExpired) {
          return (
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => handleUnbanUser(params.row.id)}
            >
              Ban'dan Çıxart
            </Button>
          );
        } else {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Ban Müddəti</InputLabel>
                <Select
                  value={banDuration}
                  label="Ban Müddəti"
                  onChange={handleDurationChange}
                >
                  <MenuItem value="">
                    <em>Seçin</em>
                  </MenuItem>
                  <MenuItem value="1_week">1 Həftə</MenuItem>
                  <MenuItem value="2_weeks">2 Həftə</MenuItem>
                  <MenuItem value="1_month">1 Ay</MenuItem>
                  <MenuItem value="permanent">Daimi</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="error"
                size="small"
                disabled={!banDuration}
                onClick={() => handleBanUser(params.row.id, banDuration)}
              >
                Ban Et
              </Button>
            </Box>
          );
        }
      },
    },
  ];

  if (loading) {
    return <div className="text-center py-10 text-xl text-gray-600">İstifadəçilər yüklənir...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-xl text-red-600">{error}</div>;
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <h2 className="text-2xl font-bold mb-4">İstifadəçi İdarəetməsi</h2>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default AdminUsers;