import {useState} from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Button,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { DevicesUpdate } from './devices-update';
import { getInitials } from 'src/utils/get-initials';

export const DevicesTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;
  const [openModal, setOpenModal] = useState(false);
  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  const handleOpenModal = () => {
    setOpenModal(true);
  }

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Notification
                </TableCell>
                <TableCell>
                  Temperature High
                </TableCell>
                <TableCell>
                  Temperature Low
                </TableCell>
                <TableCell>
                  pH High
                </TableCell>
                <TableCell>
                  pH Low
                </TableCell>
                <TableCell>
                  TDO High
                </TableCell>
                <TableCell>
                  TDO Low
                </TableCell>
                <TableCell>
                  TDS High
                </TableCell>
                <TableCell>
                  TDS High
                </TableCell>
                <TableCell>
                  Turbidities High
                </TableCell>
                <TableCell>
                  Turbidities Low
                </TableCell>
                <TableCell>
                  Master ID
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((device) => {
                const isSelected = selected.includes(device.id);
                return (
                  <TableRow
                    hover
                    key={device.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(device.id);
                          } else {
                            onDeselectOne?.(device.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Typography variant="subtitle2">
                          {device.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {device.notificationEnabled}
                    </TableCell>
                    <TableCell>
                      {device.tempHigh}
                    </TableCell>
                    <TableCell>
                      {device.tempLow}
                    </TableCell>
                    <TableCell>
                      {device.phHigh}
                    </TableCell>
                    <TableCell>
                      {device.phLow}
                    </TableCell>
                    <TableCell>
                      {device.tdoHigh}
                    </TableCell>
                    <TableCell>
                      {device.tdoLow}
                    </TableCell>
                    <TableCell>
                      {device.tdsHigh}
                    </TableCell>
                    <TableCell>
                      {device.tdsLow}
                    </TableCell>
                    <TableCell>
                      {device.turbiditiesHigh}
                    </TableCell>
                    <TableCell>
                      {device.turbiditiesLow}
                    </TableCell>
                    <TableCell>
                      {device.masterId}
                    </TableCell>
                    <TableCell>
                      <Button
                        color='inherit'
                        variant='text'
                        onClick={handleOpenModal}
                      >Update</Button>
                    </TableCell>
                    <DevicesUpdate openModal={openModal} setOpenModal={setOpenModal} device={device}/>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

DevicesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
