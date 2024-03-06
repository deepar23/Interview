Feature: Registration and login
    As a user, I should be able to register and login to the app

Scenario: User registers and login to the app
    Given I open the bookbazar homepage
    When I open the bookbazar registration page
    And I wait to see "Create Account" page
    And I type "Test" in the "RegName" field
    #Pass a valid mobile number here
    And I type "" in the "RegMobile" field
    And I type "" in the "RegPass" field
    And I type "" in the "RegPass1" field
    And I click on the "ctl00_ContentPlaceHolder1_registerbtn" button
    And I wait to see "OTP Verification" page
    #Type the actual OTP sent to the mobile number
    And I type "244487" in the "CustomerOTP" field
    And I click on the "ctl00_ContentPlaceHolder1_OTPVerifybtn" button
    Then I "should see" the username "Test" on the welcome page 