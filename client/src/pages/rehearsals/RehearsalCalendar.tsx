import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Stack,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Placeholder for API calls and redux actions
import { fetchRehearsals, fetchBands } from '../../store/slices/rehearsalSlice';
import RehearsalFormDialog from '../../components/rehearsals/RehearsalFormDialog';

const RehearsalCalendar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [selectedBand, setSelectedBand] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Placeholder for redux state
  const { rehearsals, bands, loading, error } = useSelector((state: any) => state.rehearsal);
  const { user } = useSelector((state: any) => state.auth);
  
  useEffect(() => {
    // Fetch rehearsals and bands when component mounts
    dispatch(fetchRehearsals());
    dispatch(fetchBands());
  }, [dispatch]);
  
  // Format rehearsals for calendar display
  const calendarEvents = rehearsals.map((rehearsal: any) => ({
    id: rehearsal.id,
    title: rehearsal.title,
    start: rehearsal.startTime,
    end: rehearsal.endTime,
    extendedProps: {
      location: rehearsal.location,
      bandId: rehearsal.bandId,
      bandName: bands.find((band: any) => band.id === rehearsal.bandId)?.name || 'Unknown Band'
    },
    backgroundColor: rehearsal.isRecurring ? '#4caf50' : '#3f51b5',
    borderColor: rehearsal.isRecurring ? '#4caf50' : '#3f51b5'
  }));
  
  // Filter events based on selected band
  const filteredEvents = selectedBand === 'all'
    ? calendarEvents
    : calendarEvents.filter((event: any) => event.extendedProps.bandId === selectedBand);
  
  const handleBandChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedBand(event.target.value as string);
  };
  
  const handleDateClick = (arg: any) => {
    setSelectedDate(arg.date);
    setIsAddDialogOpen(true);
  };
  
  const handleEventClick = (arg: any) => {
    navigate(`/rehearsals/${arg.event.id}`);
  };
  
  const handleAddDialogClose = () => {
    setIsAddDialogOpen(false);
    setSelectedDate(null);
  };
  
  return (
    <Container maxWidth="xl">
      <Box mb={4}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1">
            Rehearsal Calendar
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setIsAddDialogOpen(true)}
          >
            Add Rehearsal
          </Button>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ p: 2, mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="band-select-label">Filter by Band</InputLabel>
            <Select
              labelId="band-select-label"
              value={selectedBand}
              label="Filter by Band"
              onChange={handleBandChange}
            >
              <MenuItem value="all">All Bands</MenuItem>
              {bands.map((band: any) => (
                <MenuItem key={band.id} value={band.id}>
                  {band.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>

        <Paper sx={{ p: 2 }}>
          {loading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : (
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={filteredEvents}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              height="auto"
              eventTimeFormat={{
                hour: 'numeric',
                minute: '2-digit',
                meridiem: 'short'
              }}
            />
          )}
        </Paper>
      </Box>

      {/* Rehearsal Form Dialog */}
      <RehearsalFormDialog
        open={isAddDialogOpen}
        onClose={handleAddDialogClose}
        initialDate={selectedDate}
        bands={bands}
      />
    </Container>
  );
};

export default RehearsalCalendar;