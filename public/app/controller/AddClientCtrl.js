graspuApp.controller('AddClientCtrl', ['$scope', 'auth', '$state', 'dataShareService', 'fileUpload', '$window',
  function($scope, auth, $state, dataShareService, fileUpload, $window) {
    dataShareService.Menu = "Client";

    var today = new Date();
    $scope.today = today.toISOString();
    $scope.logout = function() {
      console.log("I am in logout");
      authToken.removeToken();
      $state.go('login');
    };
    if (localStorage.getItem('userToken') == null) {
      $location.path("/login");
    }
    $scope.editableMode = false;

    $scope.client = {
      firstName: null,
      lastName: null,
      email: null,
      userName: null,
      conpanyName: null,
      status: null,
      password: null,
      typeOfBusiness: null,
      graspersQuantity: null,
      contractTerm: null,
      physicalAddress: {
        address1: null,
        address2: null,
        city: null,
        state: null,
        zip: null,
      },
      mailingAddress: {
        sameAsPhysicalAddress: false,
        address1: null,
        address2: null,
        city: null,
        state: null,
        zip: null,
      },
      bilingAddress: {
        sameAsMailingAddress: false,
        address1: null,
        address2: null,
        city: null,
        state: null,
        zip: null,
      },
      decisionMaker: [],
      billingAdministrator: [],
      contractExpirationDate: null,
      pricing: null,
      discount: null,
      clientTerms: null
    };


    $scope.status = {
      availableOptions: [{
        id: '1',
        name: 'Active'
      }, {
        id: '2',
        name: 'Inactive'
      }],
      selectedOption: {
        id: '1',
        name: 'Active'
      } //This sets the default value of the select in the ui
    };

    $scope.updateStatus = function() {
      console.log("Inside updateStatus", $scope.status.selectedOption);
      $scope.client.status = $scope.status.selectedOption.name;
    };

    $scope.bussinesstype = {
      availableOptions: [{
        id: '1',
        name: 'One'
      }, {
        id: '2',
        name: 'Two'
      }, {
        id: '3',
        name: 'Other'
      }],
      selectedOption: {
        id: '1',
        name: 'One'
      } //This sets the default value of the select in the ui
    };

    $scope.updatebussiness_type = function() {
      console.log("Inside updatebussiness_type", $scope.bussinesstype.selectedOption);
      $scope.client.typeOfBusiness = $scope.bussinesstype.selectedOption.name;
    };



    $scope.Contract_Terms = {
      availableOptions: [{
        id: '1',
        name: '1 year'
      }, {
        id: '2',
        name: '2 year'
      }, {
        id: '3',
        name: '3 year'
      }, {
        id: '4',
        name: 'other'
      }],
      selectedOption: {
        id: '1',
        name: '1 year'
      } //This sets the default value of the select in the ui
    };

    $scope.updateContract_Terms = function() {
      console.log("Inside updateContract_Terms", $scope.state.selectedOption);
      $scope.client.contractTerm = $scope.Contract_Terms.selectedOption.name;
    };

    ///////////////////////////////////////////

    $scope.state = {
      availableOptions: [{
        id: '1',
        name: 'Punjab'
      }, {
        id: '2',
        name: 'Chandigarh'
      }, {
        id: '3',
        name: 'Panchkula'
      }],
      selectedOption: {
        id: '1',
        name: 'Punjab'
      } //This sets the default value of the select in the ui
    };

    $scope.updatestate = function() {
      console.log("Inside updatebussiness_type", $scope.state.selectedOption);
      $scope.client.physicalAddress.state = $scope.state.selectedOption.name;
    };

    ///////////////////////////////////////

    ///////////////////////////////////////////

    $scope.stateMail = {
      availableOptions: [{
        id: '1',
        name: 'Punjab'
      }, {
        id: '2',
        name: 'Chandigarh'
      }, {
        id: '3',
        name: 'Panchkula'
      }],
      selectedOption: {
        id: '1',
        name: 'Punjab'
      } //This sets the default value of the select in the ui
    };

    $scope.updatestateMail = function() {
      console.log("Inside updatebussiness_type", $scope.stateMail.selectedOption);
      $scope.client.mailingAddress.state = $scope.stateMail.selectedOption.name;
    };

    ///////////////////////////////////////

    ///////////////////////////////////////////

    $scope.stateBill = {
      availableOptions: [{
        id: '1',
        name: 'Punjab'
      }, {
        id: '2',
        name: 'Chandigarh'
      }, {
        id: '3',
        name: 'Panchkula'
      }],
      selectedOption: {
        id: '1',
        name: 'Punjab'
      } //This sets the default value of the select in the ui
    };

    $scope.updatestateBill = function() {
      console.log("Inside updatestateBill", $scope.stateBill.selectedOption);
      $scope.client.bilingAddress.state = $scope.stateBill.selectedOption.name;
    };

    ///////////////////////////////////////

    var decisionMakerObj = {
      name: null,
      title: null,
      username: null,
      password: null,
      emailone: null,
      emailtwo: null,
      officePhoneNo: null,
      officePhoneNoExt: null,
      cellPhone: null,
      other: null,
    };
    $scope.client.decisionMaker.push(decisionMakerObj);

    $scope.addMoreDecisionMakers = function() {
      var decisionMakerObj1 = {
        name: "",
        title: "",
        username: "",
        password: "",
        emailone: "",
        emailtwo: "",
        officePhoneNo: "",
        officePhoneNoExt: "",
        cellPhone: "",
        other: ""
      };
      $scope.client.decisionMaker.push(decisionMakerObj1);
    };



    ///////////////////////////////////////////////////////
    var billingAdministratorObj = {
      name: null,
      title: null,
      emailone: null,
      emailtwo: null,
      officePhoneNo: null,
      officePhoneNoExt: null,
      cellPhone: null,
      other: null,
      paymentChoice: null
    };
    $scope.client.billingAdministrator.push(billingAdministratorObj);

    $scope.addMoreBillingAdministrator = function() {
      var billingAdministratorObj1 = {
        name: "",
        title: "",
        emailone: "",
        emailtwo: "",
        officePhoneNo: "",
        officePhoneNoExt: "",
        cellPhone: "",
        other: "",
        paymentChoice: ""
      };
      $scope.client.billingAdministrator.push(billingAdministratorObj1);
    };

    ////////////////////////////////////////////



    $scope.mailAddSameAsPhyAdd = function() {
      console.log("client.mailingAddress.sameAsPhysicalAddress - ", $scope.client.mailingAddress.sameAsPhysicalAddress);
      if ($scope.client.mailingAddress.sameAsPhysicalAddress) {
        $scope.client.mailingAddress = $scope.client.physicalAddress;
        $scope.stateMail.selectedOption = $scope.state.selectedOption;
      } else {
        var defaultData = {
          sameAsPhysicalAddress: false,
          address1: "",
          address2: "",
          city: "",
          state: "",
          zip: ""
        };
        $scope.client.mailingAddress = defaultData;
      }
    };

    $scope.BillAddSameAsMailAdd = function() {
      console.log("client.mailingAddress.BillAddSameAsMailAdd - ", $scope.client.bilingAddress.sameAsMailingAddress);
      if ($scope.client.bilingAddress.sameAsMailingAddress) {
        console.log("$scope.client.mailingAddress - ", $scope.client.mailingAddress);
        $scope.client.bilingAddress = $scope.client.mailingAddress;
        $scope.stateBill.selectedOption = $scope.stateMail.selectedOption;
      } else {
        var defaultData = {
          sameAsMailingAddress: false,
          address1: "",
          address2: "",
          city: "",
          state: "",
          zip: ""
        };
        $scope.client.bilingAddress = defaultData;
      }
    };


    $scope.createClient = function() {
      console.log("$scope.clientForm.$valid - ", $scope.clientForm.$valid);
      $scope.submitted = true;
      if ($scope.clientForm.$valid) {
        console.log("$scope.client", $scope.client);
        var profileImage = $scope.profileImage;
        var companyLogo = $scope.companyLogo;
        fileUpload.uploadClientToUrl(profileImage, companyLogo, $scope.client, function(err, response) {
          if (err) {
            console.log("Error during adding client", err);
            if (err.data.err == "username already in use") {
              var notify = {
                type: 'error',
                title: 'Username is already in use, please select different username',
                timeout: 3000 //time in ms
              };
              $scope.$emit('notify', notify);
            }
          } else {
            console.log("client successfully created", response);
            $state.go('listclient');
            var notify = {
              type: 'success',
              title: 'Client added successfully',
              content: 'Client Name: ' + $scope.client.firstName + ' ' + $scope.client.lastName,
              timeout: 3000 //time in ms
            };
            $scope.$emit('notify', notify);
          }
        });
      } else {
        console.log("Scrolling on top");
        $window.scrollTo(0, 0);
      }
    };


    $scope.$watch(function() {
        return dataShareService.editableClient;
      },
      function(newVal, oldVal) {
        console.log("value changed - ", newVal, oldVal);
        $scope.client = newVal;
        if (newVal === null && oldVal === null) {
          $scope.editableMode = false;
          $scope.client = {
            firstName: null,
            lastName: null,
            email: null,
            userName: null,
            conpanyName: null,
            status: null,
            password: null,
            typeOfBusiness: null,
            graspersQuantity: null,
            contractTerm: null,
            physicalAddress: {
              address1: null,
              address2: null,
              city: null,
              state: null,
              zip: null,
            },
            mailingAddress: {
              sameAsPhysicalAddress: false,
              address1: null,
              address2: null,
              city: null,
              state: null,
              zip: null,
            },
            bilingAddress: {
              sameAsMailingAddress: false,
              address1: null,
              address2: null,
              city: null,
              state: null,
              zip: null,
            },
            decisionMaker: [],
            billingAdministrator: [],
            contractExpirationDate: null,
            pricing: null,
            discount: null,
            clientTerms: null
          };
          var billingAdministratorObj = {
            name: null,
            title: null,
            emailone: null,
            emailtwo: null,
            officePhoneNo: null,
            officePhoneNoExt: null,
            cellPhone: null,
            other: null,
            paymentChoice: null
          };
          $scope.client.billingAdministrator.push(billingAdministratorObj);


          var decisionMakerObj = {
            name: null,
            title: null,
            username: null,
            password: null,
            emailone: null,
            emailtwo: null,
            officePhoneNo: null,
            officePhoneNoExt: null,
            cellPhone: null,
            other: null,
          };
          $scope.client.decisionMaker.push(decisionMakerObj);
        } else {
          $scope.editableMode = true;
        }
      }, true);

    $scope.updateClient = function() {
      console.log("$scope.clientForm.$valid - ", $scope.clientForm.$valid);
      $scope.submitted = true;
      if ($scope.clientForm.$valid) {
        console.log("$scope.client - ", $scope.client);
        var profileImage = $scope.profileImage;
        var companyLogo = $scope.companyLogo;
        if ($scope.editableMode === true) {
          $scope.client.editableMode = $scope.editableMode;
        }
        fileUpload.uploadClientToUrl(profileImage, companyLogo, $scope.client, function(err, response) {
          if (err) {
            console.log("Error during adding client", err);
            if (err.data && err.data.err == "username already in use") {
              var notify = {
                type: 'error',
                title: 'Username is already in use, please select different username',
                timeout: 3000 //time in ms
              };
              $scope.$emit('notify', notify);
            }
          } else {
            console.log("client successfully created", response);
            $state.go('listclient');
            var notify = {
              type: 'success',
              title: 'Client updated successfully',
              content: 'Client Name: ' + $scope.client.firstName + ' ' + $scope.client.lastName,
              timeout: 3000 //time in ms
            };
            $scope.$emit('notify', notify);

          }
        });
      } else {
        $window.scrollTo(0, 0);
      }
    };
  }
]);
