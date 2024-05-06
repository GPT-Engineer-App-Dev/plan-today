import { Box, Button, Container, Flex, IconButton, Input, List, ListItem, Text, useToast, VStack } from "@chakra-ui/react";
import { FaTrash, FaCheck } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === "") {
      toast({
        title: "Cannot add empty task",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex as="nav" justify="space-between" align="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
      </Flex>
      <VStack spacing={4}>
        <Flex as="form" onSubmit={(e) => { e.preventDefault(); addTask(); }} width="100%">
          <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
          <Button onClick={addTask} ml={2}>Add</Button>
        </Flex>
        <List spacing={3} width="100%">
          {tasks.map(task => (
            <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center" p={2} boxShadow="md" borderRadius="md">
              <Text as={task.isCompleted ? "s" : ""}>{task.text}</Text>
              <Flex>
                <IconButton icon={<FaCheck />} isRound="true" onClick={() => toggleTaskCompletion(task.id)} aria-label="Complete Task" m={1} />
                <IconButton icon={<FaTrash />} isRound="true" onClick={() => deleteTask(task.id)} aria-label="Delete Task" m={1} />
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;