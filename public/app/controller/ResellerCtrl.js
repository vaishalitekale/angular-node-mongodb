graspuApp.controller('ResellerCtrl', ['$scope', 'authToken', '$state', '$http', '$rootScope', '$location', 'resellerFactory', 'dataShareService', 'fileUpload', '$window',
  function($scope, authToken, $state, $http, $rootScope, $location, resellerFactory, dataShareService, fileUpload, $window) {
    console.log("I am in reseller controller");
    dataShareService.Menu = "Reseller";
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

    $scope.reseller = {
      firstName: null,
      lastName: null,
      email: null,
      userName: null,
      conpanyName: null,
      status: null,
      password: null,
      typeOfBusiness: null,
      industrySpecialization: null,
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
      resellerTerms: null
    };


    $scope.reselersName = {
      availableOptions: [{
        id: '1',
        name: 'Active/Inactive'
      }, {
        id: '2',
        name: 'Active'
      }, {
        id: '3',
        name: 'Inactive'
      }],
      selectedOption: {
        id: '1',
        name: 'Active/Inactive'
      } //This sets the default value of the select in the ui
    };

    $scope.updateStatus = function() {
      console.log("Inside updateStatus", $scope.reselersName.selectedOption);
      $scope.reseller.status = $scope.reselersName.selectedOption.name;
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
      $scope.reseller.typeOfBusiness = $scope.bussinesstype.selectedOption.name;
    };

    $scope.Industry_Specialization = {
      availableOptions: [{
        id: '1',
        name: 'One'
      }, {
        id: '2',
        name: 'Two'
      }],
      selectedOption: {
        id: '1',
        name: 'One'
      } //This sets the default value of the select in the ui
    };

    $scope.updateIndustry_Specialization = function() {
      console.log("Inside updatebussiness_type", $scope.Industry_Specialization.selectedOption);
      $scope.reseller.industrySpecialization = $scope.Industry_Specialization.selectedOption.name;
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
      $scope.reseller.contractTerm = $scope.Contract_Terms.selectedOption.name;
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
      $scope.reseller.physicalAddress.state = $scope.state.selectedOption.name;
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
      $scope.reseller.mailingAddress.state = $scope.stateMail.selectedOption.name;
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
      $scope.reseller.bilingAddress.state = $scope.stateBill.selectedOption.name;
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
    $scope.reseller.decisionMaker.push(decisionMakerObj);

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
      $scope.reseller.decisionMaker.push(decisionMakerObj1);
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
    $scope.reseller.billingAdministrator.push(billingAdministratorObj);

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
      $scope.reseller.billingAdministrator.push(billingAdministratorObj1);
    };

    ////////////////////////////////////////////



    $scope.mailAddSameAsPhyAdd = function() {
      console.log("reseller.mailingAddress.sameAsPhysicalAddress - ", $scope.reseller.mailingAddress.sameAsPhysicalAddress);
      if ($scope.reseller.mailingAddress.sameAsPhysicalAddress) {
        $scope.reseller.mailingAddress = $scope.reseller.physicalAddress;
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
        $scope.reseller.mailingAddress = defaultData;
      }
    };

    $scope.BillAddSameAsMailAdd = function() {
      console.log("reseller.mailingAddress.BillAddSameAsMailAdd - ", $scope.reseller.bilingAddress.sameAsMailingAddress);
      if ($scope.reseller.bilingAddress.sameAsMailingAddress) {
        console.log("$scope.reseller.mailingAddress - ", $scope.reseller.mailingAddress);
        $scope.reseller.bilingAddress = $scope.reseller.mailingAddress;
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
        $scope.reseller.bilingAddress = defaultData;
      }
    };


    $scope.$watch(function() {
        return dataShareService.editableReseller;
      },
      function(newVal, oldVal) {
        console.log("value changed - ", newVal, oldVal);
        $scope.reseller = newVal;
        if (newVal === null && oldVal === null) {
          $scope.editableMode = false;
          $scope.reseller = {
            firstName: null,
            lastName: null,
            email: null,
            userName: null,
            conpanyName: null,
            status: null,
            password: null,
            typeOfBusiness: null,
            industrySpecialization: null,
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
            resellerTerms: null
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
          $scope.reseller.billingAdministrator.push(billingAdministratorObj);


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
          $scope.reseller.decisionMaker.push(decisionMakerObj);


        } else {
          $scope.editableMode = true;
        }

        //$scope.activeMenu =dataShareService.Menu;
      }, true);



    $scope.createReseller = function() {
      console.log("$scope.resellerForm.$valid - ", $scope.resellerForm.$valid);
      $scope.submitted = true;
      if ($scope.resellerForm.$valid) {
        console.log("$scope.reseller - ", $scope.reseller);
        var profileImage = $scope.profileImage;
        var companyLogo = $scope.companyLogo;
        fileUpload.uploadFileToUrl(profileImage, companyLogo, $scope.reseller, function(err, response) {
          if (err) {
            console.log("Error during adding reseller", err);
            if (err.data.err == "username already in use") {
              var notify = {
                type: 'error',
                title: 'Username is already in use, please select different username',
                timeout: 3000 //time in ms
              };
              $scope.$emit('notify', notify);
            }
          } else {
            console.log("Reseller successfully created", response);
            $state.go('listreseller');
            var notify = {
              type: 'success',
              title: 'Reseller created successfully',
              content: 'Reseller Name: ' + $scope.reseller.firstName + ' ' + $scope.reseller.lastName,
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

    $scope.updateReseller = function() {
      console.log("$scope.resellerForm.$valid - ", $scope.resellerForm.$valid);
      $scope.submitted = true;
      if ($scope.resellerForm.$valid) {
        console.log("$scope.reseller - ", $scope.reseller);
        var profileImage = $scope.profileImage;
        var companyLogo = $scope.companyLogo;
        if ($scope.editableMode === true) {
          $scope.reseller.editableMode = $scope.editableMode;
        }
        fileUpload.uploadFileToUrl(profileImage, companyLogo, $scope.reseller, function(err, response) {
          if (err) {
            console.log("Error during adding reseller", err);
            if (err.data && err.data.err == "username already in use") {
              var notify = {
                type: 'error',
                title: 'Username is already in use, please select different username',
                timeout: 3000 //time in ms
              };
              $scope.$emit('notify', notify);
            }
          } else {
            console.log("Reseller successfully created", response);
            $state.go('listreseller');
            var notify = {
              type: 'success',
              title: 'Reseller updated successfully',
              content: 'Reseller Name: ' + $scope.reseller.firstName + ' ' + $scope.reseller.lastName,
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
