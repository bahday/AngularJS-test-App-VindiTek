angular.module('app', [])
    .controller('treeController', function () {

        var vm = this;
        vm.items = { name: "test", children: [] };
        vm.editedItem = {};
        vm.departments = [];
        vm.changeItem = function (items) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].id === vm.editedItem.id) {
                    items[i].name = vm.editedItem.name;
                    items[i].title = vm.editedItem.title;
                    items[i].department = vm.editedItem.department;
                    break;
                };
                if (Array.isArray(items[i].children)) vm.changeItem(items[i].children);
            }
        }

        vm.saveChanges = function () {
            if (vm.items.id === vm.editedItem.id) {
                vm.items.name = vm.editedItem.name;
                vm.items.title = vm.editedItem.title;
                vm.items.department = vm.editedItem.department;
            } else vm.changeItem(vm.items.children);
            fetch("/structure/",
                {
                    method: 'put',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(vm.items)
                })
                .then(res => { console.log('Success change!'); })
                .catch(res => { console.log('Error!'); });

        }

        vm.getData = function () {
            return fetch('structure')
                .then(
                function (response) {
                    return response.json();
                })
                .catch(function (response) {
                })
                .then(function (response) {
                    vm.items = response;
                });
        }
        
        vm.getData = function () {
            return fetch('structure')
                .then(
                function (response) {
                    return response.json();
                })
                .catch(function (response) {
                })
                .then(function (response) {
                    vm.items = response;

                });

        }

        vm.countChild = function (element) {
            let count = 1;
            if (Array.isArray(element.children)) {
                element.children.forEach(function (item) {
                    count += vm.countChild(item);
                });
            }
            return count;
        };

        vm.showModal = function (element) {
            vm.editedItem.id = element.id;
            vm.editedItem.name = element.name;
            vm.editedItem.title = element.title;
            vm.editedItem.department = element.department;
        };

        vm.exportData = function () {
            fetch('db')
                .then(
                function (response) {
                    return response.json();
                })
                .then(function (response) {
                    console.log(JSON.stringify(response));

                });
        }

        vm.getData();
    });