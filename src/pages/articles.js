import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ArticlesTable } from 'src/sections/articles/articles-table';
import { ArticlesSearch } from 'src/sections/articles/articles-search';
import { ArticlesAdd } from 'src/sections/articles/articles-add';
import { applyPagination } from 'src/utils/apply-pagination';
import { instance } from 'src/hooks/use-api';

let data = [];

instance({
  url: '/articles',
  method: 'get'
}).then((response) => {
  data = response.data;
});

const useArticles = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useArticleIds = (articles) => {
  return useMemo(
    () => {
      return articles.map((article) => article.id);
    },
    [articles]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const articles = useArticles(page, rowsPerPage);
  const articlesIds = useArticleIds(articles);
  const articlesSelection = useSelection(articlesIds);

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
            <ArticlesAdd setOpen={openModal}/>
            <ArticlesSearch />
            <ArticlesTable
              count={data.length}
              items={articles}
              onDeselectAll={articlesSelection.handleDeselectAll}
              onDeselectOne={articlesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={articlesSelection.handleSelectAll}
              onSelectOne={articlesSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={articlesSelection.selected}
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
