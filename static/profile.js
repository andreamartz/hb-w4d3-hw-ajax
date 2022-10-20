function submitProfile(evt) {
  evt.preventDefault();

  // get the values for city types
  const checkboxInputs = document.querySelectorAll('input[type="checkbox"]');
  const selectedCityTypes = {};
  
  for (const checkboxInput in checkboxInputs) {
    // use only the first three elements in the NodeList; the others are not inputs
    if (checkboxInput <= 2) {
      const value = checkboxInputs[checkboxInput].value;
      const checked = checkboxInputs[checkboxInput].checked;

      selectedCityTypes[value] = checked;
    }
  }

  // get the value for doesGardening
  const doesGardeningRadioInputs = document.querySelectorAll('[name="garden"]');
  let doesGardening = null;
  for (const radioInput in doesGardeningRadioInputs) {
    console.dir(radioInput);
    if (radioInput <= 1) {
      const value = doesGardeningRadioInputs[radioInput].value;
      const checked = doesGardeningRadioInputs[radioInput].checked;
      if (checked) {
        doesGardening = value;
      }
    }
  }

  const formInputs = {
    name: document.querySelector('#name-field').value,
    age: document.querySelector('#age-field').value,
    occupation: document.querySelector('#occupation-field').value,
    salary: document.querySelector('[name="salary"]').value,
    education: document.querySelector('[name="education"]').value,
    state: document.querySelector('[name="state"]').value,
    selectedCityTypes,
    doesGardening,
    hoursOfTv: document.querySelector('[name="tv"]').value,
  };

  console.log("THE DATA: ", formInputs, Object.keys(formInputs).length);
  console.log(Object.keys(selectedCityTypes).length);

  // make request to server to get the data
  fetch('/api/profile', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("RESPONSE JSON: ", responseJson);
      // add the data the server returns to the document (in the div with id 'profiles')
      for (const key in responseJson) {
        document.querySelector('#profiles').insertAdjacentHTML('beforeend',
        `<li>${key}: ${responseJson[key]}</li>`
      )}
    });
}

document.querySelector('#profile-form').addEventListener('submit', submitProfile);
