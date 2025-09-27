Feature: User Login
  As a registered user
  I want to login with valid credentials
  So that I can access the system

  Scenario: Successful login
    Given a user exists with username "thisara" and password "1234"
    When the user tries to login with username "thisara" and password "1234"
    Then login should be successful

  Scenario: Invalid login
    Given a user exists with username "thisara" and password "1234"
    When the user tries to login with username "thisara" and password "5678"
    Then login should fail

  Scenario: User not found
    Given no user exists with username "samuditha"
    When the user tries to login with username "samuditha" and password "1234"
    Then login should fail with message "User not found"