# Interval-Tree
a javascript implementation of the Interval Tree ADT

Interval Tree: The idea is to augment a self-balancing Binary Search Tree (BST) like Red Black Tree, AVL Tree, etc to maintain set of intervals so that all operations can be done in O(Logn) time.

Every node of Interval Tree stores following information.
*a) i: An interval which is represented as a pair [low, high]
*b) max: Maximum high value in subtree rooted with this node.

The low value of an interval is used as key to maintain order in BST. The insert and delete operations are same as insert and delete in self-balancing BST used.

![Interval-Tree](http://d2o58evtke57tz.cloudfront.net/wp-content/uploads/IntervalSearcTree.png)
