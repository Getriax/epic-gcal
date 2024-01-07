import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  TableContainer,
} from '@chakra-ui/react';
import { EventItem } from '../api/calendar.ts';

interface EventsTableProps {
  events: EventItem[];
}

export const EventsTable: React.FC<EventsTableProps> = ({ events }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const handleEventClick = (event: EventItem) => {
    setSelectedEvent(event);
    onOpen();
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple" size="md" borderRadius="lg" boxShadow="md">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Date</Th>
              <Th>Attendees</Th>
              <Th>Location</Th>
            </Tr>
          </Thead>
          <Tbody>
            {events.map((event, index) => (
              <Tr
                key={index}
                _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                onClick={() => handleEventClick(event)}
              >
                <Td>{event.name}</Td>
                <Td>{event.date}</Td>
                <Td>
                  {event.attendees
                    .map((attendee) => attendee.name || attendee.email)
                    .join(', ')}
                </Td>
                <Td>{event.location}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {selectedEvent && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent borderRadius="lg" boxShadow="md">
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>Date: {selectedEvent.date}</p>
              <p>
                Attendees:{' '}
                {selectedEvent.attendees
                  .map((attendee) => attendee.name)
                  .join(', ')}
              </p>
              <p>Location: {selectedEvent.location}</p>
              <p>Description: {selectedEvent.description}</p>
              <p>Organizer: {selectedEvent.organizer}</p>
              <p>Created: {selectedEvent.created}</p>
              <p>Updated: {selectedEvent.updated}</p>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
