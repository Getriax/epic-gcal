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
  VStack,
  Text,
  HStack,
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

  const prettyDate = (dateString: string) => {
    const date = new Date(dateString);

    const formatter = new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
      hour12: false,
    });

    return formatter.format(date);
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
                <Td>{prettyDate(event.date)}</Td>
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
          <ModalContent>
            <ModalHeader>{selectedEvent.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4} align="stretch">
                <Text fontWeight="bold">Date & Time:</Text>
                <Text>{prettyDate(selectedEvent.date)}</Text>
                <Text fontWeight="bold">Location:</Text>
                <Text>{selectedEvent.location}</Text>
                <Text fontWeight="bold">Description:</Text>
                <Text>{selectedEvent.description}</Text>
                <Text fontWeight="bold">Organizer:</Text>
                <Text>{selectedEvent.organizer}</Text>
                <Text fontWeight="bold">Attendees:</Text>
                {selectedEvent.attendees.map((attendee) => (
                  <HStack key={attendee.email}>
                    <VStack>
                      <Text color="gray.500">
                        {attendee.name || attendee.email}
                      </Text>
                    </VStack>
                  </HStack>
                ))}
                <Text fontWeight="bold">Created:</Text>
                <Text>{prettyDate(selectedEvent.created)}</Text>
                <Text fontWeight="bold">Updated:</Text>
                <Text>{prettyDate(selectedEvent.updated)}</Text>
              </VStack>
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
