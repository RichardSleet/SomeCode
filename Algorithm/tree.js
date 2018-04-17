var tree = {
    value: 1,
    left: {
        value: 2,
        left: {
            value: 4
        }
    },
    right: {
        value: 3,
        left: {
            value: 5,
            left: {
                value: 7
            },
            right: {
                value: 8
            }
        },
        right: {
            value: 6
        }
    }
}
var preOrder = function (node) {
    if (node) {
        console.log(node.value);
        preOrder(node.left);
        preOrder(node.right);
    }
}
preOrder(tree);

var inOrder = function (node) {
    if (node) {
        inOrder(node.left);
        console.log(node.value);
        inOrder(node.right);
    }
}
inOrder(trree);

var postOrder = function (node) {
    if (node) {
      postOrder(node.left);
      postOrder(node.right);
      console.log(node.value);
    }
}
postOrder(tree);