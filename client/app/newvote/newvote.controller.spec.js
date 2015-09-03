'use strict';

describe('Controller: NewvoteCtrl', function () {

  // load the controller's module
  beforeEach(module('voteAppApp'));

  var NewvoteCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewvoteCtrl = $controller('NewvoteCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
