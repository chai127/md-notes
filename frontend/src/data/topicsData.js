// src/data/topicsData_CPP_Embedded.js
export const topicsData = [
  // --- C Fundamentals (ID: 1-5) ---
  {
    _id: "1",
    name: "C Language Pointers",
    createdAt: "2025-10-15T10:00:00Z",
    notes: [
      { _id: "n1", title: "Pointer Declaration", content: "Syntax is `type *ptr_name;`. Stores the memory address of a variable." },
      { _id: "n2", title: "Dereferencing", content: "Using the `*` operator to access the value at the address stored by the pointer." },
      { _id: "n3", title: "Pointer Arithmetic", content: "Incrementing/decrementing a pointer moves it by the size of its base type." }
    ]
  },
  {
    _id: "2",
    name: "C Memory Allocation",
    createdAt: "2025-10-14T14:30:00Z",
    notes: [
      { _id: "n4", title: "malloc()", content: "Allocates a block of memory of a specified size from the heap. Returns void*." },
      { _id: "n5", title: "calloc()", content: "Allocates memory and initializes all bytes to zero." },
      { _id: "n6", title: "free()", content: "Deallocates the memory previously allocated by malloc/calloc/realloc, preventing memory leaks." }
    ]
  },
  {
    _id: "3",
    name: "C Preprocessor Directives",
    createdAt: "2025-10-13T09:15:00Z",
    notes: [
      { _id: "n7", title: "#include", content: "Includes the content of another file (header file) into the current file." },
      { _id: "n8", title: "#define", content: "Used to define macros or symbolic constants." },
      { _id: "n9", title: "Conditional Compilation", content: "Using `#ifdef`, `#ifndef`, and `#endif` to compile specific code blocks." }
    ]
  },
  {
    _id: "4",
    name: "C Structs and Unions",
    createdAt: "2025-10-12T16:50:00Z",
    notes: [
      { _id: "n10", title: "Structures", content: "User-defined data type that groups related variables of different types." },
      { _id: "n11", title: "Unions", content: "A memory location shared by different variables, only one of which can be active at a time." }
    ]
  },
  {
    _id: "5",
    name: "Bitwise Operations",
    createdAt: "2025-10-11T11:00:00Z",
    notes: [
      { _id: "n12", title: "AND, OR, XOR", content: "Used for clearing, setting, or toggling specific bits." },
      { _id: "n13", title: "Shifting", content: "Left (`<<`) and right (`>>`) shifts for quick multiplication/division by powers of 2." }
    ]
  },

  // --- C++ Core Concepts (ID: 6-12) ---
  {
    _id: "6",
    name: "C++ Classes and Objects",
    createdAt: "2025-10-10T08:30:00Z",
    notes: [
      { _id: "n14", title: "Encapsulation", content: "Binding data (members) and the functions (methods) that operate on that data." },
      { _id: "n15", title: "Constructors/Destructors", content: "Special methods for object initialization and cleanup." }
    ]
  },
  {
    _id: "7",
    name: "C++ Inheritance",
    createdAt: "2025-10-09T17:45:00Z",
    notes: [
      { _id: "n16", title: "Types", content: "Single, Multiple, Multilevel, and Hierarchical inheritance." },
      { _id: "n17", title: "Access Specifiers", content: "public, private, and protected keywords determine visibility." }
    ]
  },
  {
    _id: "8",
    name: "C++ Polymorphism",
    createdAt: "2025-10-08T12:00:00Z",
    notes: [
      { _id: "n18", title: "Function Overloading", content: "Compile-time polymorphism where multiple functions share the same name but different signatures." },
      { _id: "n19", title: "Virtual Functions", content: "Run-time polymorphism enabled by the `virtual` keyword and realized through dynamic dispatch." }
    ]
  },
  {
    _id: "9",
    name: "C++ Templates",
    createdAt: "2025-10-07T19:20:00Z",
    notes: [
      { _id: "n20", title: "Generic Programming", content: "Writing functions and classes that operate with generic types." },
      { _id: "n21", title: "Function Templates", content: "Template arguments are inferred from the function call." }
    ]
  },
  {
    _id: "10",
    name: "C++ Standard Library (STL)",
    createdAt: "2025-10-06T10:00:00Z",
    notes: [
      { _id: "n22", title: "Containers", content: "Examples: `std::vector`, `std::map`, `std::list` for data management." },
      { _id: "n23", title: "Iterators", content: "Abstracts the concept of a pointer to an element in a container." }
    ]
  },
  {
    _id: "11",
    name: "RAII (Resource Acquisition Is Initialization)",
    createdAt: "2025-10-05T15:30:00Z",
    notes: [
      { _id: "n24", title: "Principle", content: "Resources are managed by objects, and cleanup happens automatically in the destructor." },
      { _id: "n25", title: "Smart Pointers", content: "`std::unique_ptr` and `std::shared_ptr` implement RAII for memory management." }
    ]
  },
  {
    _id: "12",
    name: "C++ Move Semantics (C++11)",
    createdAt: "2025-10-04T22:00:00Z",
    notes: [
      { _id: "n26", title: "rvalue references", content: "The `&&` syntax, used to refer to temporary objects." },
      { _id: "n27", title: "Move Constructor", content: "Avoids deep copies by 'stealing' the resources from a temporary object." }
    ]
  },

  // --- Embedded/Systems Topics (ID: 13-25) ---
  {
    _id: "13",
    name: "Microcontroller Peripherals",
    createdAt: "2025-10-03T11:40:00Z",
    notes: [
      { _id: "n28", title: "GPIO", content: "General Purpose Input/Output: configuring pins as inputs, outputs, or internal pull-ups/downs." },
      { _id: "n29", title: "Timers", content: "Used for generating delays, PWM, and measuring time intervals." }
    ]
  },
  {
    _id: "14",
    name: "Inter-Process Communication (IPC)",
    createdAt: "2025-10-02T13:00:00Z",
    notes: [
      { _id: "n30", title: "Shared Memory", content: "The fastest IPC mechanism, allowing two or more processes to share the same physical memory." }
    ]
  },
  {
    _id: "15",
    name: "Embedded Serial Protocols (I/O)",
    createdAt: "2025-10-01T09:30:00Z",
    notes: [
      { _id: "n31", title: "UART/USART", content: "Asynchronous serial communication. Requires start/stop bits." },
      { _id: "n32", title: "SPI", content: "Synchronous communication, faster than I2C, uses 4 wires (MOSI, MISO, SCK, CS)." },
      { _id: "n33", title: "I2C", content: "Two-wire protocol (SDA, SCL) for short-distance, multi-master communication." }
    ]
  },
  {
    _id: "16",
    name: "Real-Time Operating Systems (RTOS)",
    createdAt: "2025-09-30T16:10:00Z",
    notes: [
      { _id: "n34", title: "Tasks and Threads", content: "Independent units of execution managed by the RTOS scheduler." },
      { _id: "n35", title: "Scheduling", content: "Priority-based and time-slicing algorithms determine which task runs next." }
    ]
  },
  {
    _id: "17",
    name: "Interrupts and ISRs",
    createdAt: "2025-09-29T18:45:00Z",
    notes: [
      { _id: "n36", title: "Interrupt Service Routine", content: "A function that is automatically called by the hardware in response to an event." },
      { _id: "n37", title: "Volatile Keyword", content: "Crucial for variables shared between main code and an ISR to prevent compiler optimization." }
    ]
  },
  {
    _id: "18",
    name: "Firmware Bootloader",
    createdAt: "2025-09-28T07:00:00Z",
    notes: [
      { _id: "n38", title: "Function", content: "Small program that initializes the hardware and loads the main application code into memory." }
    ]
  },
  {
    _id: "19",
    name: "Dijkstra's Algorithm (Pathfinding)",
    createdAt: "2025-09-27T21:30:00Z",
    notes: [] // Topic with no notes yet
  },
  {
    _id: "20",
    name: "Data Structures: Linked Lists",
    createdAt: "2025-09-26T14:00:00Z",
    notes: [
      { _id: "n39", title: "Singly Linked List", content: "Each node points to the next node in the sequence." },
      { _id: "n40", title: "Dynamic Memory", content: "Linked lists commonly use `malloc()` and `free()` for node management." }
    ]
  },
  {
    _id: "21",
    name: "Data Structures: Binary Trees",
    createdAt: "2025-09-25T11:00:00Z",
    notes: []
  },
  {
    _id: "22",
    name: "Design Patterns: Singleton",
    createdAt: "2025-09-24T17:25:00Z",
    notes: [
      { _id: "n41", title: "Purpose", content: "Ensures a class has only one instance and provides a global point of access to it." }
    ]
  },
  {
    _id: "23",
    name: "Cross-Compilation",
    createdAt: "2025-09-23T08:50:00Z",
    notes: [
      { _id: "n42", title: "Toolchain", content: "A set of programming tools (compiler, linker, debugger) for a specific target architecture." }
    ]
  },
  {
    _id: "24",
    name: "Static Analysis Tools",
    createdAt: "2025-09-22T19:00:00Z",
    notes: [
      { _id: "n43", title: "Linting", content: "Tools like clang-tidy or PC-Lint to check code for stylistic errors and non-obvious bugs." }
    ]
  },
  {
    _id: "25",
    name: "ARM Architecture Basics",
    createdAt: "2025-09-21T13:30:00Z",
    notes: [
      { _id: "n44", title: "RISC", content: "Reduced Instruction Set Computing, which favors simpler, faster instructions." },
      { _id: "n45", title: "Registers", content: "Small, fast storage locations within the CPU (e.g., R0-R12, LR, PC)." }
    ]
  }
];