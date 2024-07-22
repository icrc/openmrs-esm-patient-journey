# OpenMRS Patient Journey App

A microfrontend module that enhances the OpenMRS experience by providing a configurable widget for patient journeys.


## Getting Started

To run the microfrontend locally:

```sh
yarn  # to install dependencies
yarn start  # to run the dev server
```
Also, possible to use a docker container to run yarn:


```sh
sh run.sh yarn  # to install dependencies
sh run.sh yarn start  # to run the dev server
```

## Configuration
### Configuring Patient Journey Steps
This configuration allows you to define multiple steps in a patient journey, each containing a set of forms with associated UUIDs and encounter types. Specify whether a form is mandatory with the "isMandatory" flag.

In the patient journey configuration, ensure that each step includes at least one mandatory form. Once all mandatory forms within a step are successfully filled out, the patient journey app will automatically progress to the next step. 

Below, here's an example how to configure workflow steps:

```json
{
  "@icrc/esm-patient-journey-app": {
    "steps": [
        {
        "step": "Step 1",
        "forms": [
            {
                "formUuid": "your_form_uuid_1",
                "encounterTypeUuid": "your_encounter_type_uuid_1",
                "isMandatory": true
            },
            {
                "formUuid": "your_form_uuid_2",
                "encounterTypeUuid": "your_encounter_type_uuid_2",
                "isMandatory": false
            }
        ]
        },
        {
        "step": "Step 2",
        "forms": [
            {
                "formUuid": "your_form_uuid_3",
                "encounterTypeUuid": "your_encounter_type_uuid_3",
                "isMandatory": true
            }
        ]
        }
    ]
  }
}
```