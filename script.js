const demoButton =
    document.getElementById("demoButton");

const demoStatus =
    document.getElementById("demoStatus");

const demoResult =
    document.getElementById("demoResult");

const progressBar =
    document.getElementById("progressBar");


if (demoButton)
{
    demoButton.addEventListener(
        "click",
        function()
        {
            demoButton.disabled = true;

            demoButton.innerText =
                "⟳ ĐANG QUÉT...";

            demoStatus.innerText =
                "Connecting to URLChecker backend...";

            demoResult.innerText =
                "";

            progressBar.style.width =
                "10%";


            setTimeout(
                function()
                {
                    demoStatus.innerText =
                        "Analyzing domain...";

                    progressBar.style.width =
                        "35%";
                },
                500
            );


            setTimeout(
                function()
                {
                    demoStatus.innerText =
                        "Checking VirusTotal engines...";

                    progressBar.style.width =
                        "65%";
                },
                1000
            );


            setTimeout(
                function()
                {
                    demoStatus.innerText =
                        "Security analysis completed.";

                    progressBar.style.width =
                        "100%";

                    demoResult.innerText =
                        "⚠ WARNING: 7 engines detected this demo URL.";

                    demoButton.disabled =
                        false;

                    demoButton.innerText =
                        "↻ CHẠY LẠI DEMO";
                },
                1800
            );
        }
    );
}