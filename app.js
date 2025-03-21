document.addEventListener("input", calculateMonthly);

function calculateMonthly() {
  const pastHours = parseFloat(document.getElementById("pastHours").value) || 0;
  const pastMinutes =
    parseFloat(document.getElementById("pastMinutes").value) || 0;
  const amPm = document.getElementById("amPm").value;
  const startHour = parseFloat(document.getElementById("startHour").value) || 0;
  const startMinute =
    parseFloat(document.getElementById("startMinute").value) || 0;
  const monthlyTarget = parseFloat(
    document.getElementById("monthlyTarget").value
  );
  const breakTime =
    parseFloat(document.getElementById("breakTime").value) || 60;

  const resultElement = document.getElementById("monthlyResult");

  // 필수 입력값 확인
  const allInputFilled =
    document.getElementById("pastHours").value.length !== 0 &&
    document.getElementById("startHour").value.length !== 0 &&
    document.getElementById("monthlyTarget").value.length !== 0;

  // 필수 입력값이 없으면 기본 상태
  if (!allInputFilled) {
    resultElement.innerText = "퇴근 시간: --:--";
    resultElement.classList.remove("completed", "insufficient");
    return;
  }

  // 어제까지 근무한 시간 (분 단위로 변환)
  const workedMinutes = pastHours * 60 + pastMinutes;
  const targetMinutes = monthlyTarget * 60;
  const remainingMinutes = targetMinutes - workedMinutes;

  if (remainingMinutes <= 0) {
    resultElement.innerHTML = "이미 근무시간을 채웠습니다!";
    resultElement.classList.remove("insufficient");
    resultElement.classList.add("completed");
    return;
  }

  // 출근 시간 변환 (AM/PM 적용)
  let startTotalHour = startHour;
  if (amPm === "PM" && startHour !== 12) {
    startTotalHour += 12;
  }
  if (amPm === "AM" && startHour === 12) {
    startTotalHour = 0;
  }
  const startTotalMinutes = startTotalHour * 60 + startMinute;

  // 퇴근 시간 계산 (남은 근무 시간 + 휴게 시간 추가)
  const workEndTotalMinutes = startTotalMinutes + remainingMinutes + breakTime;
  const workEndHour = Math.floor(workEndTotalMinutes / 60);
  const workEndMinute = workEndTotalMinutes % 60;

  const result = `퇴근 시간: ${workEndHour
    .toString()
    .padStart(2, "0")}:${workEndMinute.toString().padStart(2, "0")}`;

  resultElement.innerText = result;
  resultElement.classList.remove("completed");
  resultElement.classList.add("insufficient");
}
