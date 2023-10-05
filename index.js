function onTaskExecuteSendDismissal(routeStage) {
  debugger;
  if (routeStage.executionResult == "executed") {
    sendMail();
  }
}

function sendMail() {
  //var emailInitiator1 = EdocsApi.getEmployeeDataByEmployeeID(EdocsApi.getAttributeValue("Initiator1").value).email;
  var Date1 = EdocsApi.getAttributeValue("Date1").value;
  var methodData = {
    recipients: [
      EdocsApi.getEmployeeDataByEmployeeID(
        EdocsApi.getAttributeValue("Initiator1").value
      ).email,
    ],
    subject: "Запит на звільнення",
    body: `<html><body>
    <a href="https://etechua.sharepoint.com/sites/eDocs/instruction/%D0%86%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%86%D1%96%D1%97%20%D0%97%D0%B0%D1%8F%D0%B2%D0%B0%20%D0%BD%D0%B0%20%D0%B7%D0%B2%D1%96%D0%BB%D1%8C%D0%BD%D0%B5%D0%BD%D0%BD%D1%8F.pdf">Інструкції Заява на звільнення.pdf</a>
    <a href="https://online.e-docs.ua/">Посилання на систему еДокс</a>
    Створіть в еДокс заяву про звільнення та запустіть процес її погодження.<br />Дата звільнення – ${
      Date1
        ? (new Date(Date1).getDate() < 10
            ? "0" + new Date(Date1).getDate()
            : new Date(Date1).getDate()) +
          "-" +
          (new Date(Date1).getMonth() + 1 < 10
            ? "0" + Number(new Date(Date1).getMonth() + 1)
            : Number(new Date(Date1).getMonth() + 1)) +
          "-" +
          new Date(Date1).getFullYear()
        : " "
    }. Причина звільнення - ${
      EdocsApi.getAttributeValue("Reason_for_leaving")?.value
    }</body></html>`,
  };

  EdocsApi.sendMsgMail(methodData);
}

function onSearchInitiator1(request) {
  request.filterCollection.push({
    attributeCode: "SubdivisionExtId",
    value: EdocsApi.getOrgUnitDataByUnitID(
      EdocsApi.getEmployeeDataByEmployeeID(
        EdocsApi.getAttributeValue("InitiatorName").value
      ).unitId
    ).extId,
  });
}
