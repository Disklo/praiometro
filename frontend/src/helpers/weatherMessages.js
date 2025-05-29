
function getHumidityMessage(humidity) {
    if (humidity >= 80) {
        return "Umidade alta, vista roupas leves!";
    } else if (humidity >= 60) {
        return "Sem riscos, mas não deixe de se hidratar!";
    } else if (humidity >= 40) {
        return "Risco moderado, hidrate-se!";
    } else if (humidity >= 20) {
        return "Risco alto, hidrate-se e fique em locais frescos!";
    } else {
        return "Risco extremo, hidrate-se ao máximo!";
    }
}

function getSensationMessage(temperature) {
    if (temperature >= 36) {
        return "Calor extremo, fique em locais frescos e ventilados!";
    } else if (temperature >= 26) {
        return "Calor, hidrate-se e use protetor solar!";
    } else if (temperature >= 16) {
        return "Clima agradável, aproveite!";
    } else {
        return "Frio, use roupas quentes e proteja-se do vento!";
    }
}

function getUVIndexMessage(uvIndex) {
    if (uvIndex <= 2) {
        return "Risco baixo, use protetor solar se ficar exposto por muito tempo.";
    } else if (uvIndex <= 5) {
        return "Risco moderado, use protetor solar e evite exposição direta ao sol.";
    } else if (uvIndex <= 7) {
        return "Risco alto, use protetor solar e evite exposição direta ao sol durante o pico do dia.";
    } else if (uvIndex <= 10) {
        return "Risco muito alto, use roupas protetoras e evite exposição direta ao sol.";
    } else {
        return "Risco extremo, evite exposição direta ao sol e use roupas protetoras.";
    }
}

function getUVIndexLevel(uvIndex) {
    if (uvIndex <= 2) {
        return 'Baixo';
    } else if (uvIndex <= 5) {
        return 'Moderado';
    } else if (uvIndex <= 7) {
        return 'Alto';
    } else if (uvIndex <= 10) {
        return 'Muito Alto';
    } else {
        return 'Extremo';
    }
}

export {
    getHumidityMessage,
    getSensationMessage,
    getUVIndexMessage,
    getUVIndexLevel
};