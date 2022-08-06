/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { View, StyleSheet, Text } from "react-native";
import Input from "../ui/Input";
import { useState } from "react";
import { GlobalStyles } from "../../../util/constants/styles";

import IconButton from "../../../components/functional/ui/IconButton";

function ProjectInputForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) {
  //managing multiple external user input state values
  //inputs: inputs and their information, eg valdity
  const [inputs, setInputs] = useState({
    //if true convert to string, if false revert to empty string
    //this allows project data to appear on form if there is existing data
    title: {
      value: defaultValues ? defaultValues.title.toString() : "",
      //   isValid: !!defaultValues,
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      //   isValid: !!defaultValues,
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : "",
      //   isValid: !!defaultValues,
      isValid: true,
    },
    deadline: {
      value: defaultValues
        ? defaultValues.deadline.toISOString().slice(0, 10)
        : "",
      //   isValid: !!defaultValues,
      isValid: true,
    },
  });

  //generic function to handle multiple types of state input. InputIdentifier must be passed into this function
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      //targeting whatver value is in inputIdentifier
      return {
        ...curInputs,
        //when we enter something, we initially assume it is valid then apply checks later
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const projectData = {
      title: inputs.title.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
      deadline: new Date(inputs.deadline.value),
    };

    //validation constants
    const titleIsValid = projectData.title.trim().length > 0;
    const dateIsValid = projectData.date.toString() !== "Invalid Date";
    //users can put whatever they want in the description field or leave blank
    const descriptionIsValid = projectData.title.trim().length >= 0;
    const deadlineIsValid = projectData.deadline.toString() !== "Invalid Date";

    if (
      !titleIsValid ||
      !dateIsValid ||
      !descriptionIsValid ||
      !deadlineIsValid
    ) {
      //show feedback
      //   Alert.alert("Invalid input");
      setInputs((curInputs) => {
        return {
          title: { value: curInputs.title.value, isValid: titleIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
          deadline: {
            value: curInputs.deadline.value,
            isValid: deadlineIsValid,
          },
        };
      });
      return;
    }

    onSubmit(projectData);
  }

  //if something on the form is invalid this is false
  const formIsInvalid =
    !inputs.title.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid ||
    !inputs.deadline.isValid;

  return (
    <View styles={styles.form}>
      <Input
        label="Title"
        invalid={!inputs.title.isValid}
        textInputConfig={{
          keyboardType: "default",
          autoCapitalize: "words",
          onChangeText: inputChangedHandler.bind(this, "title"),
          //two way binding:
          value: inputs.title.value,
        }}
      />
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            keyboardType: "number-pad",
            placeholder: "YYYY-MM--DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            //two way binding:
            value: inputs.date.value,
          }}
        />
        <Input
          label="Deadline"
          style={styles.rowInput}
          invalid={!inputs.deadline.isValid}
          textInputConfig={{
            keyboardType: "number-pad",
            placeholder: "YYYY-MM--DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "deadline"),
            //two way binding:
            value: inputs.deadline.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          keyboardType: "default",
          autoCapitalize: "sentences",
          multiline: true,
          autoCorrect: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          //two way binding:
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && <Text style={styles.errorText}>Error :(</Text>}
      <View style={styles.buttonContainer}>
        {/* <CustomButton style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </CustomButton>
        <CustomButton style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </CustomButton> */}
        <IconButton
          icon="close-circle-outline"
          color={GlobalStyles.colors.midGrey}
          size={28}
          onPress={onCancel}
        />
        <IconButton
          icon="md-add-circle-sharp"
          color={GlobalStyles.colors.orange200}
          size={28}
          onPress={submitHandler}
        />
      </View>
    </View>
  );
}

export default ProjectInputForm;

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
