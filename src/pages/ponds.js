import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { PondsTable } from 'src/sections/ponds/ponds-table';
import { PondsSearch } from 'src/sections/ponds/ponds-search';
import { PondsAdd } from 'src/sections/ponds/ponds-add';
import { applyPagination } from 'src/utils/apply-pagination';
import { instance } from 'src/hooks/use-api';

let data = [];

instance({
  url: '/ponds',
  method: 'get'
}).then((response) => {
  data = response.data;
});

const usePonds = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const usePondIds = (ponds) => {
  return useMemo(
    () => {
      return ponds.map((pond) => pond.id);
    },
    [ponds]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const ponds = usePonds(page, rowsPerPage);
  const pondsIds = usePondIds(ponds);
  const pondsSelection = useSelection(pondsIds);

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
          Ponds | Devias Kit
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
                  Ponds
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
                {/* <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={handleOpenModal}
                >
                  Add
                </Button> */}
              </div>
            </Stack>
            <PondsAdd isOpen={openModal} setOpen={setOpenModal}/>
            <PondsSearch />
            <PondsTable
              count={data.length}
              items={ponds}
              onDeselectAll={pondsSelection.handleDeselectAll}
              onDeselectOne={pondsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={pondsSelection.handleSelectAll}
              onSelectOne={pondsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={pondsSelection.selected}
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
