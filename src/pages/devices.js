import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { DevicesTable } from 'src/sections/devices/devices-table';
// import { MastersSearch } from 'src/sections/devices/devices-search';
import { DevicesAdd } from 'src/sections/devices/devices-add';
import { applyPagination } from 'src/utils/apply-pagination';
import { instance } from 'src/hooks/use-api';

let data = [];

instance({
  url: '/devices',
  method: 'get'
}).then((response) => {
  data = response.data;
});

const useDevices = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useDevicesIds = (devices) => {
  return useMemo(
    () => {
      return devices.map((device) => device.id);
    },
    [devices]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const devices = useDevices(page, rowsPerPage);
  const devicesIds = useDevicesIds(devices);
  const devicesSelection = useSelection(devicesIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Devices | Devias Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Devices
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleOpenModal}
                >
                  Add
                </Button>
              </div>
            </Stack>
            <DevicesAdd isOpen={openModal} setOpen={setOpenModal} />
            <DevicesTable
              count={data.length}
              items={devices}
              devices={devices.handleDeselectAll}
              onDeselectAll={devicesSelection.handleDeselectAll}
              onDeselectOne={devicesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={devicesSelection.handleSelectAll}
              onSelectOne={devicesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={devicesSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
