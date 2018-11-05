## H1 Inputs
The inputs component collection refers to the dynamically created form elements. Any new or custom form component used within the application should be created in its own folder and contained within this. At a later point we may move this to it's own module but for now the current structure will suffice.

In cases where the form component renders child forms / elements, container the item renderer within the component's folder rather than an individual folder for each form input.

## H2 DynamicFormComponent (dynamic-form)
Acts as a wrapper for any dyanmically created form used within the application.

## H2 DynamicFormInputComponent (dynamic-form-input)
The main renderer for all form components. Once a component as been completed and is ready to integrate add an instance of the component and sitch as to whether the component is rendered based on the questions 'controlType' attribute.

## H2 CountrySelectComponent (country-select)
Designed to allow the user to select a country from either a pre-defined list of common countries or other. The component will allow for the primary list of countries to be rendered as buttons with an autocomplete being available if there are a list of other countries available to the User.

## H2 DateSelectComponent (date-select)
Designed to permit the user to enter a date value. This component can be costomised in many ways but will princially render a list of predefined date values, the output of which is dependant on the DateQuestion's lookaheadType and displayType values.

## H2 TravellersListComponent (travellers-list)
Designed to allow multiple travellers / persons to be added to a quote. The item renderer for the component will allow for the input of the person's forename, surname and age to be added to the Form.