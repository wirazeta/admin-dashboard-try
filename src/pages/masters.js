import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { MastersTable } from 'src/sections/masters/masters-table';
import { MastersAdd } from 'src/sections/masters/masters-add';
import { applyPagination } from 'src/utils/apply-pagination';
import { instance } from 'src/hooks/use-api';

const Page = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await instance.get('/masters');
      setData(response.data);
    }
    fetchData();
  },[]);

  console.log(data);
  
  const useMasters = (page, rowsPerPage) => {
    return useMemo(
      () => {
        return applyPagination(data, page, rowsPerPage);
      },
      [page, rowsPerPage]
    );
  };
  
  const useMasterIds = (masters) => {
    return useMemo(
      () => {
        return masters.map((master) => master.id);
      },
      [masters]
    );
  };

  const [page, setPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const masters = useMasters(page, rowsPerPage);
  const mastersIds = useMasterIds(masters);
  const mastersSelection = useSelection(mastersIds);

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
          Masters | Devias Kit
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
                  Masters
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
            <MastersAdd isOpen={openModal} setOpen={setOpenModal}/>
            <MastersTable
              count={data.length}
              items={masters}
              onDeselectAll={mastersSelection.handleDeselectAll}
              onDeselectOne={mastersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={mastersSelection.handleSelectAll}
              onSelectOne={mastersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={mastersSelection.selected}
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
