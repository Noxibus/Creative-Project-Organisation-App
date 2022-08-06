/* eslint-disable react/react-in-jsx-scope */
import { View, StyleSheet, Text } from "react-native";
import Input from "../ui/Input";
import { useState } from "react";
import CustomButton from "../ui/CustomButton";
import { getFormattedDate } from "../../../util/date";
import { GlobalStyles } from "../../../util/constants/styles";

//TODO: FIX ISSUE UPDATE STATE
//TODO: MAKE FORM SCROLLABLE WHEN MULTILINE SECRIPTION INPUT EXCEEDS SCREEN SIZE

function IssueInputForm({ onCancel, onSubmit, defaultValues }) {
  //managing multiple external user input state values
  //inputs: inputs and their information, eg valdity
  const [inputs, setInputs] = useState({
    //if true convert to string, if false revert to empty string
    //this allows issue data to appear on form if there is existing data
    issueTitle: {
      value: defaultValues ? defaultValues.issueTitle.toString() : "",
      isValid: true,
    },
    issueDescription: {
      value: defaultValues ? defaultValues.issueDescription.toString() : "",
      isValid: true,
    },
    dateLogged: {
      value: defaultValues
        ? defaultValues.dateLogged.toISOString().slice(0, 10)
        : "",
      isValid: true,
    },
    dateResolved: {
      value: defaultValues
        ? defaultValues.dateResolved.toISOString().slice(0, 10)
        : "",
      isValid: true,
    },
  });

  //generic function to handle multiple types of state input. InputIdentifier must be passed into this function
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  function submitHandler() {
    const issueData = {
      issueTitle: inputs.issueTitle.value,
      issueDescription: inputs.issueDescription.value,
      dateLogged: new Date(inputs.dateLogged.value),
      dateResolved: new Date(inputs.dateResolved.value),
    };

    //Validation constants
    const issueTitleIsValid = issueData.issueTitle.trim().length > 0;
    const issueDescriptionIsValid = issueData.issueTitle.trim().length >= 0;
    const dateLoggedIsValid =
      issueData.dateLogged.toString() !== "Invalid Date";
    const dateResolvedIsValid =
      issueData.dateResolved.toString() !== "Invalid Date";

    //if something is invalid
    if (
      !issueTitleIsValid ||
      !issueDescriptionIsValid ||
      !dateLoggedIsValid ||
      !dateResolvedIsValid
    ) {
      setInputs((curInputs) => {
        return {
          issueTitle: {
            value: curInputs.issueTitle.value,
            isValid: issueTitleIsValid,
          },
          issueDescription: {
            balue: curInputs.issueDescription.value,
            isValid: issueDescriptionIsValid,
          },
          dateLogged: {
            value: curInputs.dateLogged.value,
            isValid: dateLoggedIsValid,
          },
          dateResolved: {
            value: curInputs.dateResolved.value,
            isValid: dateResolvedIsValid,
          },
        };
      });
      return;
    }
    onSubmit(issueData);
  }
  const formIsInvalid =
    !inputs.issueTitle.isValid ||
    !inputs.issueDescription.isValid ||
    !inputs.dateLogged.isValid ||
    !inputs.dateResolved.isValid;

  return (
    <View style={styles.form}>
      <Input
        label="Title"
        invalid={!inputs.issueTitle.isValid}
        textInputConfig={{
          keyboardType: "default",
          autoCapitalize: "words",
          onChangeText: inputChangedHandler.bind(this, "issueTitle"),
          value: inputs.issueTitle.value,
        }}
      />
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Date Logged"
          invalid={!inputs.dateLogged.isValid}
          textInputConfig={{
            keyboardType: "number-pad",
            placeholder: "YYYY-MM--DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "dateLogged"),
            //two way binding:
            value: inputs.dateLogged.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date Resolved"
          invalid={!inputs.dateResolved.isValid}
          textInputConfig={{
            keyboardType: "number-pad",
            placeholder: "YYYY-MM--DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "dateResolved"),
            //two way binding:
            value: inputs.dateResolved.value,
          }}
        />
      </View>
      <View>
        <Input
          label="Description"
          invalid={!inputs.issueDescription.isValid}
          textInputConfig={{
            keyboardType: "default",
            autoCapitalize: "sentences",
            multiline: true,
            autoCorrect: true,
            onChangeText: inputChangedHandler.bind(this, "issueDescription"),
            //two way binding:
            value: inputs.issueDescription.value,
          }}
        />
        {formIsInvalid && <Text style={styles.errorText}>Error :(</Text>}
        <View style={styles.buttonContainer}>
          <CustomButton style={styles.button} mode="flat" onPress={onCancel}>
            Cancel
          </CustomButton>
          <CustomButton style={styles.button} onPress={submitHandler}>
            Update
          </CustomButton>
        </View>
      </View>
    </View>
  );
}

export default IssueInputForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    // marginVertical: 24,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24,
    // borderTopColor: GlobalStyles.colors.orange300,
    // borderTopWidth: 2,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    margin: 8,
    color: GlobalStyles.colors.errorRed,
  },
});
