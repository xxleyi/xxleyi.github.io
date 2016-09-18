---
"title": "The Patterns on Stone 摘抄"
"date": 2016-09-18
---

## 摘抄

One of the most remarkable things about computers is that their essential nature transcends technology. That nature is what this book is about.

The first is the principle of functional abstraction, which leads to the aforementioned hierarchy of causes and effects. Functional abstraction is what decouples the ideas from the technology.

The second unifying theme is the principle of the universal computer—the idea that there is really only one kind of computer, or, more precisely, that all kinds of computers are alike in what they can and cannot do.

The third theme in this book, which won’t be fully addressed until the last chapter, is in some sense the antithesis of the first. But what if instead we were to use a design process analogous to biological evolution—that is, a process in which the behaviors of the system emerge from the accumulation of many simple interactions, without any “top-down” control?

The philosopher Gregory Bateson once defined information as “the difference that makes a difference.” Another way of saying this is that information is in the distinctions we choose to make significant.

The true power of the computer is that it is capable of manipulating not just the expression of ideas but also the ideas themselves.

> The computer is not just an advanced calculator or camera or paintbrush; rather, it is a device that accelerates and extends our processes of thought. It is an imagination machine, which starts with the ideas we put into it and takes them farther than we ever could have taken them on our own.

I didn’t have the slightest idea how to control the motors and the lights, and I realized that something was missing in my knowledge of how robots worked.

I now have a name for what was missing: it’s called computation.

The implication of this construction is that any function capable of being described as a precise logical statement can be implemented by an analogous system of switches.

It shows how a task can be reduced to logical functions and how such functions can be implemented as a circuit of connected switches.

Computation is about performing tasks that seem to be complex (like winning a game of tic-tac-toe) by breaking them down into simple operations (like closing a switch).

For some strange reason, computer scientists always draw trees upside-down, with the “root” at the top.

Another difference between the tic-tac-toe machine and a general-purpose computer is that the tic-tac-toe machine can perform only one function. The “program” of the machine is built into its wiring. The tic-tac-toe machine has no software.

Here I must pause to mention the bit. The smallest “difference that makes a difference” (to use Bateson’s phrase again) is a difference that splits all signals into two distinct classes.

> The more accurate statement is “The computer represents numbers, letters, and everything else with patterns of bits.”-- 计算机如何呈现一切

> I never forgot the lesson of that first machine: the implementation technology must produce perfect outputs from imperfect inputs, nipping small errors in the bud. This is the essence of digital technology, which restores signals to near perfection at every stage. It is the only way we know—at least, so far—for keeping a complicated system under control.

Naming the two signals in computer logic 0 and 1 is an example of functional abstraction. It lets us manipulate information without worrying about the details of its underlying representation.

Computers are built up of a hierarchy of such functional abstractions, each one embodied in a building block. The blocks that perform functions are hooked together to implement more complex functions, and these collections of blocks in turn become the new building blocks for the next level.

计算机系统，乃至任何复杂系统，得以建构起来的核心原理是：分层级建构，低层级可抽象为功能接口，可为高层级复用，低层级的具体实现可以迭代升级，但不影响功能接口。

这是设计理念，软硬件通用，为保证「人造系统」可用，必须实现层级分离，且每一层级具备足够的健壮性。

固然，整个系统的性能会受到各层级具体实现效率的影响，但我们为整个系统设计的「功能目标」必须可以实现，在此前提之下，才可以谈效率优化问题。

The basic idea of a finite-state machine is to combine a look-up table, constructed using Boolean logic, with a memory device. The memory is used to store a summary of the past, which is the state of the finite-state machine.

The magic of a computer lies in its ability to become almost anything you can imagine, as long as you can explain exactly what that is. The hitch is in explaining what you want.

Ultimately all these functions are implemented by the Boolean logic blocks and finite-state machines described in the previous chapter, but the human computer programmer rarely thinks about these elements; instead, programmers work with a more convenient tool called a programming language.

> The programmer’s art is the art of saying exactly what you want.

A skilled programmer is like a poet who can put into words those ideas that others find inexpressible.

The knowledge and experience that the programmer and the computer have in common is the meaning of the programming language. How the computer “knows” the meaning of the programming language will be described later; first, we will discuss the grammar, vocabulary, and idioms of such languages.

There are many different programming languages. The main reasons for this diversity are history, habit, and taste, but different programming languages also exist because they are good at describing different kinds of things.

What is important to the expressive power of the language is the vocabulary—the so-called primitives of the language—and the way the primitives can be combined to define new concepts.

But no matter what sort of data the language is designed to handle, it typically provides a way of reading the data’s elements into the computer, taking the data apart, putting them together, modifying them, comparing them, and giving them names.

The most important advantage of an object-oriented programming language is that the objects—for instance, various objects in a video game—can be specified independently and then combined to create new programs.

> A computer is just a special type of finite-state machine connected to a memory.

Some of the words stored in the memory represent data to be operated upon, like numbers and letters. Others represent instructions that tell the machine what sequence of operations to perform. The instructions are stored in machine language, which, as noted, is much simpler than a typical programming language. Machine language is interpreted directly by the finite-state machine.

The finite-state machine repeatedly executes the following sequence of operations: (1) read an instruction from the memory, (2) execute the operation specified by that instruction, and (3) calculate the address of the next instruction.

> There are two basic types of instructions in most computers: processing instructions and control instructions.

The control instructions determine the address of the next instruction to be fetched; this address is stored in a special register called the program counter.

When most of the work of conversion is done beforehand, the translation process is called compilation, and the program that performs the compilation is called a compiler. If most of the work is done while the program is being executed, then the process is called interpretation, and the program is called an interpreter. There is no hard and fast line between the two.

Most readers will have lost track of the details, but remember that it is not important to remember how every step works! The important thing to remember is the hierarchy of functional abstractions. --最重要的事情是记住并领悟「功能抽象」的『层级结构』。

The work performed by the computer is specified by a program, which is written in a programming language. This language is converted to sequences of machine-language instructions by interpreters or compilers, via a predefined set of subroutines called the operating system. The instructions, which are stored in the memory of the computer, define the operations to be performed on data, which are also stored in the computer’s memory. A finite-state machine fetches and executes these instructions. The instructions as well as the data are represented by patterns of bits. Both the finite-state machine and the memory are built of storage registers and Boolean logic blocks, and the latter are based on simple logical functions, such as And, Or, and Invert. These logical functions are implemented by switches, which are set up either in series or in parallel, and these switches control a physical substance, such as water or electricity, which is used to send one of two possible signals from one switch to another: 1 or 0. This is the hierarchy of abstraction that makes computers work.

And therefore a program that computes the halting function cannot exist.

As far as we know, any theorem that can be proved by a human being can also be proved by a computer. Humans cannot compute noncomputable problems any more than computers can.

statistically speaking, most mathematical functions are noncomputable. Fortunately, almost all these noncomputable functions are useless, and virtually all the functions we might want to compute are computable.

The laws of quantum mechanics raise a number of questions about universal computers that no one has yet answered. At first glance, it would seem that quantum mechanics fits nicely with digital computers, since the word “quantum” conveys essentially the same notion as the word “digital.” Like digital phenomena, quantum phenomena exist only in discrete states. From the quantum point of view, the (apparently) continuous, analog nature of the physical world—the flow of electricity, for example—is an illusion caused by our seeing things on a large scale rather than an atomic scale. The good news of quantum mechanics is that at the atomic scale everything is discrete, everything is digital. An electric charge contains a certain number of electrons, and there is no such thing as half an electron. The bad news is that the rules governing how objects interact at this scale are counterintuitive.

Could we harness this simultaneous computing capability of quantum mechanical objects to produce a more powerful computer? Nobody knows for sure.

If you’re hoping to be surprised by a new sort of computer, quantum mechanics is a good area to keep an eye on.

Certainly, the physics of a neuron depends on quantum mechanics, just as the physics of a transistor does, but there is no evidence that neural processing takes place at the quantum mechanical level as opposed to the classical level; that is, there is no evidence that quantum mechanics is necessary to explain human thought.

As far as we know, the brain is a kind of computer, and thought is just a complex computation. Perhaps this conclusion sounds harsh to you, but in my view it takes nothing away from the wonder or value of human thought.

To me, life and thought are both made all the more wonderful by the realization that they emerge from simple, understandable parts. I do not feel diminished by my kinship to Turing’s machine.

Since the term refers to the sequence of operations rather than the particular way they are described, it is possible to express the same algorithm in many different computer languages, or even to build it into hardware by connecting the appropriate registers and logic gates.

In many cases, it is more practical to use a procedure that only almost always gets the right answer.

Some of the most impressive behaviors of computers are the result of heuristics rather than of algorithms.

> The bit—the unit of measure for information—is appropriate both for the communication of information and for its storage. In a sense, communication and storage are just two aspects of the same thing: communication sends a message from one place to another; storage “sends” a message from one time to another.

Unless you are accustomed to thinking in four-dimensional spacetime terms, this equivalence between moving and storing may seem strange, but think of mailing a letter as a means of communication which has aspects of both.

When examined closely, any form of communication is seen to have both a spatial and a temporal aspect. One way that electronic computers store information is to constantly recirculate it, in the electronic equivalent of a self-addressed letter.

The number of bits required to send or store a given piece of data will depend on how the data is encoded.

Those sequences that appear random but have a hidden underlying pattern can be used to create codes for encrypting data.

We are approaching the limits of how much we can speed up the computer without changing the basic design.

To work any faster, today’s computers need to do more than one operation at once. We can accomplish this by breaking up the computer memory into lots of little memories and giving each its own processor.

Parallel computers are the obvious next level in this scheme, with the computers themselves as building blocks. Such a construction can be called either a parallel computer or a computer network.

> Generally, if a group of connected computers is used in a coordinated fashion, we call it a parallel computer. If the computers are used somewhat independently, we call the connected computers a computer network.

I believe that eventually the Internet will grow to include the computers embedded in telephone systems, automobiles, and simple home appliances.

As computers on the network begin to exchange interacting programs instead of just electronic mail, I suspect that the Internet will start to behave less like a network and more like a parallel computer. I suspect that the emergent behavior of the Internet will get a good deal more interesting.

> Oddly enough, I am in basic agreement with this prescientific notion: I believe that we may be able create an artificial intelligence long before we understand natural intelligence, and I suspect that the creation process will be one in which we arrange for intelligence to emerge from a complex series of interactions that we do not understand in detail—that is, a process less like engineering a machine and more like baking a cake or growing a garden. We will not engineer an artificial intelligence; rather, we will set up the right conditions under which an intelligence can emerge. The greatest achievement of our technology may well be the creation of tools that allow us to go beyond engineering—that allow us to create more than we can understand.

The human brain has about 10^12 neurons, and each neuron has, on average, 10^5 connections. The brain is to some degree a self-organizing system, but it would be wrong to think of it as a homogeneous mass. It contains hundreds of different types of neurons, many of which occur only in particular regions. Studies of brain tissue show that the patterns of neuronal connection, too, differ in the various regions of the brain: there are some fifty areas in which the pattern is recognizably different, and there are probably many more in which the differences in neural anatomy are too subtle for us to distinguish.

The important point here is that the brain is not only very complicated but also very different in structure from an engineered machine. That does not mean that we cannot ever engineer a machine to perform the functions of the human brain, but it does mean that we cannot expect to understand an intelligence by taking it apart and analyzing it as if it were a hierarchically designed machine.

It is possible that a satisfactory description of what the brain does will be almost as complex as a description of the structure of the brain—in which case, there is no meaningful sense in which we can understand it. In engineering, the way we deal with complexity is to break it into parts. Once we understand each part separately, we can understand the interactions between the parts. The way we understand each of the parts is to apply the engineering process recursively, breaking each part into a subpart, and so on. The design of an electronic computer, along with all its software, is impressive testimony to how far this process can be pushed. As long as the function of each part is carefully specified and implemented, and as long as the interactions between the parts are controlled and predictable, this system of “divide and conquer” works very well, but an evolved object like the brain does not necessarily have this kind of hierarchical structure.

> The fact that evolved software cannot always be understood makes some people nervous about using it in real applications, but I think this nervousness is founded on false assumptions. One of the assumptions is that engineered systems are always well understood, but this is true only of relatively simple systems. As noted, no single person completely understands a complex operating system. The second false assumption is that systems are less trustworthy if they cannot be explained. Given the choice of flying in an airplane operated by an engineered computer program or one flown by a human pilot, I would pick the human pilot. And I would do so even though I don’t understand how the human pilot works. I prefer to put my faith in the process that produced the pilot. As with the sorting programs, I know that a pilot is descended from a long line of survivors. If the safety of the airplane depended on sorting numbers correctly, I would rather depend on an evolved sorting program than on one written by a team of programmers.

The key idea is to shift the burden of complexity away from the hierarchy of design and onto the combinatorial power of the computer.

The human brain takes advantage of both mechanisms: it is as much a product of learning as it is of evolution. Evolution paints the broad strokes, and the development of the individual in interaction with its environment completes the picture.

> Many of my religious friends are shocked that I see the human brain as a machine and the mind as computation. On the other hand, my scientific friends accuse me of being a mystic because I believe that we may never achieve a complete understanding of the phenomenon of thought. Yet I remain convinced that neither religion nor science has everything figured out. I suspect that consciousness is a consequence of the action of normal physical laws, and a manifestation of a complex computation, but to me this makes consciousness no less mysterious and wonderful—if anything, it makes it more so. Between the signals of our neurons and the sensations of our thoughts lies a gap so great that it may never be bridged by human understanding. So when I say that the brain is a machine, it is meant not as an insult to the mind but as an acknowledgment of the potential of a machine. I do not believe that a human mind is less than what we imagine it to be, but rather that a machine can be much, much more.
