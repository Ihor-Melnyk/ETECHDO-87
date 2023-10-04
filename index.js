function onTaskExecuteSendDismissal(routeStage) {
  debugger;
  if (routeStage.executionResult == "executed") {
    sendMail();
  }
}

function sendMail() {
  var Date1 = EdocsApi.getAttributeValue("Date1").value;
  var methodData = {
    recipients: ["igor.melnick85@gmail.com"],
    subject: "Запит на звільнення",
    body: `<html><body>
    <a href="https://teams.microsoft.com/l/message/19:93496aac-ae3a-489c-8ba4-8466eb3a2c93_afe6b16b-6711-49e1-901b-716bf4ddd102@unq.gbl.spaces/1696416556680?context=%7B%22contextType%22%3A%22chat%22%7D">Інструкція по створенню Заяви </a>
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
      EdocsApi.getAttributeValue("approvalOfParticipants").value
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
