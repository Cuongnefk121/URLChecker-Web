const BACKEND =
    "https://cyberguard-jx83.onrender.com/scan?domain=";


const urlInput =
    document.getElementById(
        "urlInput"
    );

const checkButton =
    document.getElementById(
        "checkButton"
    );

const loading =
    document.getElementById(
        "loading"
    );

const result =
    document.getElementById(
        "result"
    );

const errorBox =
    document.getElementById(
        "error"
    );

const resultIcon =
    document.getElementById(
        "resultIcon"
    );

const resultTitle =
    document.getElementById(
        "resultTitle"
    );

const resultDomain =
    document.getElementById(
        "resultDomain"
    );

const maliciousCount =
    document.getElementById(
        "maliciousCount"
    );

const resultMessage =
    document.getElementById(
        "resultMessage"
    );


function getDomain(value)
{
    value =
        value.trim();


    if (!value)
    {
        return "";
    }


    try
    {
        if (
            !value.startsWith(
                "http://"
            ) &&
            !value.startsWith(
                "https://"
            )
        )
        {
            value =
                "https://" +
                value;
        }


        let domain =
            new URL(
                value
            ).hostname;


        domain =
            domain.replace(
                /^www\./,
                ""
            );


        return domain;
    }
    catch (e)
    {
        return "";
    }
}


function startLoading()
{
    loading.classList.remove(
        "hidden"
    );

    result.classList.add(
        "hidden"
    );

    errorBox.classList.add(
        "hidden"
    );

    checkButton.disabled =
        true;
}


function stopLoading()
{
    loading.classList.add(
        "hidden"
    );

    checkButton.disabled =
        false;
}


function showError(message)
{
    stopLoading();

    errorBox.innerText =
        "❌ " + message;

    errorBox.classList.remove(
        "hidden"
    );
}


function showResult(
    domain,
    malicious
)
{
    stopLoading();


    result.classList.remove(
        "hidden"
    );


    result.classList.remove(
        "danger"
    );


    resultDomain.innerText =
        domain;


    maliciousCount.innerText =
        malicious;


    if (malicious >= 3)
    {
        result.classList.add(
            "danger"
        );


        resultIcon.innerText =
            "⚠️";


        resultTitle.innerText =
            "WEBSITE CÓ NGUY CƠ";


        resultMessage.innerText =
            "VirusTotal phát hiện " +
            malicious +
            " engine đánh dấu website nguy hiểm. " +
            "Hãy cẩn thận trước khi tiếp tục.";
    }
    else
    {
        resultIcon.innerText =
            "✓";


        resultTitle.innerText =
            "CHƯA PHÁT HIỆN NGUY HIỂM";


        resultMessage.innerText =
            "VirusTotal hiện phát hiện " +
            malicious +
            " engine đánh dấu nguy hiểm.";
    }
}


async function checkWebsite()
{
    let domain =
        getDomain(
            urlInput.value
        );


    if (!domain)
    {
        showError(
            "URL không hợp lệ."
        );

        return;
    }


    startLoading();


    try
    {
        let response =
            await fetch(
                BACKEND +
                encodeURIComponent(
                    domain
                )
            );


        if (!response.ok)
        {
            throw new Error(
                "HTTP " +
                response.status
            );
        }


        let data =
            await response.json();


        let malicious =
            Number(
                data.malicious
            );


        if (
            Number.isNaN(
                malicious
            )
        )
        {
            throw new Error(
                "Kết quả không hợp lệ."
            );
        }


        console.log(
            "URLChecker:",
            domain,
            malicious
        );


        showResult(
            domain,
            malicious
        );
    }
    catch (error)
    {
        console.error(
            error
        );


        showError(
            "Không thể kết nối đến URLChecker Backend."
        );
    }
}


checkButton.addEventListener(
    "click",
    checkWebsite
);


urlInput.addEventListener(
    "keydown",
    function(event)
    {
        if (
            event.key === "Enter"
        )
        {
            checkWebsite();
        }
    }
);