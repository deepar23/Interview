Feature: Shop the books
    As a user, I should be able purchase books

Background: User is looged in to the app
    Given I open the bookbazar homepage
    When I login as test user
    And I "see" the username "Test" on the welcome page

Scenario: User is able to browse an item and proceed to checkout
    When I search for the item "Science Class 6"
    And I click on the search icon
    And I wait until the "/searchresult.aspx" page has been loaded
    And I wait 2 seconds to see the "checkout page"
    And I see the element with text "Science Class 6" in the page
    And I click on "Science Class 6" in the page
    And I see the element with text "Science Class 6" in the page
    And I click on "Add to Cart" in the page 
    And I "see" "1" in the "lnkcartdesk"
    And I click on the "lnkcartdesk" button
    And I wait to see "My Cart" page
    And I check the check box "termsofservice"
    And I see the check box "termsofservice" is checked
    And I wait for the "GetCartItemCount" api call to happen
    And I click on "Proceed to Checkout" in the page
    And I wait until the "checkout.aspx" page has been loaded
    And I "see" "Test" in the "NewAddfname_"
    And I type "123, New Building" in the "NewAddAddress_" field
    And I type "560087" in the "NewAddPin_" field
    And I type "Karnataka" in the "NewAddState_" field
    And I type "Bangalore" in the "NewAddCity_" field
    And I click on "Deliver Here" in the page
    Then I "should" see "54" in the "chkttamt"

Scenario Outline: Verify the totals
    And I "should" see "<value>" in the "<textInput>"
    Examples:
        | value   | textInput      |
        | 0       | chkdiscount    |
        | 10      | chkshipping    |
        | 64      | Grandtotalspan |

   