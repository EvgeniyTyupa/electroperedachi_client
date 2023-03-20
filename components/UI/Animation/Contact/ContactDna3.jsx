const ContactDna3 = (props) => {
    const { dnaRef } = props

    return (
        <svg
            width="1920"
            height="1401"
            viewBox="0 0 1920 1401"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            ref={dnaRef}
            id="contact"
            style={{display: "none"}}
        >
            {/* <path
                d="M-58.5601 905.788C-28.4166 830.102 74.9997 738.499 301 738.499C583.955 738.5 593 751.999 730.5 708C862.896 665.633 921.642 484.999 1107 484.999C1274.47 484.999 1485.16 629.079 1577.5 657.999C1659 683.525 1760.57 712.647 1855.5 631C2027 483.5 1910.5 436.499 2068.5 291.999C2261.45 115.535 2471.68 242.029 2571.49 297.568"
                stroke="#2200F5"
            />
            <path
                d="M-28.9767 1142.97C39.1412 1198.03 254.903 1283 489.5 1101C770.5 883 613.677 746.452 899 637C1204 520 1248.27 769.347 1662 366C2079.32 -40.8504 2242.03 185.264 2332.78 339.169"
                stroke="#767676"
                stroke-width="4"
            />
            <path
                d="M-60.0373 910.97C-29.7074 840.198 72.1639 754.624 291.772 754.88C565.624 755.137 579.6 766.838 716.138 720.601C848.919 675.061 906.347 498.808 1084.38 495.233C1245.38 491.659 1447.57 625.949 1542.3 650.886C1627.19 672.411 1728.08 701.721 1823.29 623.833C1991.43 483.228 1885.93 436.632 2046.26 289.41C2249.89 101.974 2457.85 233.213 2557.23 293.436"
                stroke="#2606EF"
                stroke-width="1.14286"
            /> */}
            <path
                d="M-61.4582 916.272C-30.9419 850.415 69.3843 770.87 282.601 771.383C547.349 771.895 566.256 781.799 701.832 733.323C834.999 684.61 891.108 512.738 1061.82 505.589C1216.35 498.439 1410.03 622.94 1507.17 643.894C1595.43 661.417 1695.64 690.916 1791.14 616.788C1955.92 483.078 1861.42 436.886 2024.07 286.941C2238.39 88.5351 2444.09 224.517 2543.04 289.425"
                stroke="#2A0BE9"
                stroke-width="1.28571"
            />
            <path
                d="M-62.8119 921.715C-32.1091 860.773 66.672 787.257 273.498 788.025C529.142 788.793 552.979 796.899 687.593 746.185C821.147 694.299 875.936 526.808 1039.33 516.084C1187.38 505.36 1372.57 620.071 1472.09 637.042C1563.74 650.564 1663.27 680.252 1759.05 609.882C1920.47 483.067 1836.97 437.281 2001.95 284.613C2226.95 75.2363 2430.39 215.962 2528.91 285.554"
                stroke="#2E11E3"
                stroke-width="1.42857"
            />
            <path
                d="M-64.0846 927.329C-33.1953 871.302 64.0407 803.816 264.475 804.839C511.016 805.863 539.784 812.171 673.436 759.219C807.375 704.161 860.845 541.05 1016.91 526.751C1158.5 512.453 1335.18 617.374 1437.1 630.362C1532.13 639.883 1630.98 669.76 1727.05 603.149C1885.1 483.229 1812.6 437.847 1979.91 282.457C2215.6 62.1094 2416.77 207.579 2514.86 281.855"
                stroke="#3216DD"
                stroke-width="1.57143"
            />
            <path
                d="M-65.2587 933.153C-34.183 882.041 61.508 820.584 255.551 821.864C492.988 823.143 526.686 827.654 659.377 772.463C793.702 714.232 845.853 555.502 994.598 537.628C1129.71 519.755 1297.89 614.887 1402.21 623.892C1500.61 629.411 1598.79 659.477 1695.15 596.625C1849.84 483.6 1788.34 438.623 1957.97 280.51C2204.34 49.192 2403.25 199.406 2500.91 278.365"
                stroke="#361CD7"
                stroke-width="1.71429"
            />
            <path
                d="M-66.3101 939.236C-35.048 893.039 59.0979 837.611 246.749 839.146C475.083 840.682 513.712 843.394 645.44 785.966C780.152 724.561 830.983 570.212 972.406 548.764C1101.05 527.316 1260.72 612.659 1367.44 617.68C1469.23 619.199 1566.72 649.453 1663.36 590.361C1814.69 484.23 1764.19 439.658 1936.15 278.823C2193.21 36.5337 2389.86 191.491 2487.08 275.135"
                stroke="#3A22D1"
                stroke-width="1.85714"
            />
            <path
                d="M-67.2088 945.643C-35.7602 904.361 56.8406 854.961 238.101 856.753C457.33 858.545 500.89 859.459 631.657 799.792C766.754 735.215 816.266 585.246 950.366 560.224C1072.54 535.201 1223.71 610.754 1332.82 611.792C1437.99 609.31 1534.81 639.753 1631.73 584.419C1779.7 485.184 1740.2 441.017 1914.49 277.459C2182.23 24.1987 2376.62 183.9 2473.41 272.228"
                stroke="#3E27CB"
                stroke-width="2"
            />
            <path
                d="M-67.9141 952.459C-36.2791 916.092 54.7767 872.721 229.645 874.769C439.771 876.817 488.262 875.933 618.066 814.028C753.549 746.277 801.743 600.69 928.52 572.093C1044.22 543.495 1186.89 609.259 1298.4 606.314C1406.95 599.83 1503.09 630.462 1600.3 578.888C1744.9 486.547 1716.4 442.785 1893.02 276.504C2171.44 12.2734 2363.57 176.718 2459.93 269.731"
                stroke="#422DC5"
                stroke-width="2.14286"
            />
            <path
                d="M-68.3723 959.8C-36.5508 928.348 52.9599 891.006 221.437 893.31C422.46 895.613 475.881 892.931 604.723 828.789C740.592 757.865 787.467 616.658 906.921 584.486C1016.15 552.314 1150.32 608.288 1264.22 601.36C1376.15 590.875 1471.61 621.696 1569.11 573.88C1710.35 488.435 1692.85 445.077 1871.79 276.074C2160.9 0.872755 2350.76 170.061 2446.69 267.758"
                stroke="#4633BF"
                stroke-width="2.28571"
            />
            <path
                d="M-68.5102 967.818C-36.5022 941.281 51.4634 909.968 213.549 912.527C405.468 915.087 463.82 910.607 591.701 844.226C727.955 770.13 773.51 633.304 885.643 597.557C988.404 561.81 1114.07 607.995 1230.37 597.084C1345.68 582.597 1440.46 613.607 1538.24 569.551C1676.12 491 1669.62 448.047 1850.89 276.322C2150.68 -9.85056 2338.28 164.082 2433.78 266.462"
                stroke="#4A38B8"
                stroke-width="2.42857"
            />
            <path
                d="M-68.2354 976.71C-36.041 955.088 50.3795 929.804 206.074 932.619C388.889 935.435 452.172 929.157 579.09 860.538C715.731 783.269 759.967 650.824 864.777 611.502C961.067 572.181 1078.23 608.576 1196.92 593.681C1315.61 575.194 1409.72 606.392 1507.78 566.095C1642.3 494.439 1646.8 451.891 1830.4 277.443C2140.88 -19.6999 2326.21 158.976 2421.28 266.041"
                stroke="#4E3EB2"
                stroke-width="2.57143"
            />
            <path
                d="M-67.4389 986.707C-35.0581 970 49.8174 950.745 199.12 953.817C372.832 956.888 441.046 948.813 567.002 877.955C704.029 797.513 746.945 669.448 844.433 626.552C934.253 583.656 1042.91 610.262 1164 591.384C1286.07 568.895 1379.5 600.283 1477.85 563.744C1609.01 498.983 1624.51 456.84 1810.43 279.67C2131.59 -28.444 2314.66 154.976 2409.3 266.725"
                stroke="#5243AC"
                stroke-width="2.71429"
            />
            <path
                d="M-66.1895 997.664C-33.6221 985.872 49.7083 972.646 192.62 975.973C357.228 979.301 430.372 969.427 555.367 896.332C692.779 812.716 734.377 689.033 824.541 642.562C907.891 596.091 1008.04 612.907 1131.53 590.046C1256.99 563.556 1349.73 595.132 1448.36 562.353C1576.17 504.487 1602.67 462.749 1790.91 282.856C2122.76 -36.2286 2303.57 151.935 2397.77 268.368"
                stroke="#5649A6"
                stroke-width="2.85714"
            />
            <path
                d="M-64.9146 1008.68C-32.1608 1001.8 49.6246 994.602 186.144 998.185C341.649 1001.77 419.724 990.097 543.757 914.763C681.555 827.975 721.833 708.672 804.676 658.626C881.554 608.581 973.203 615.607 1099.09 588.764C1227.92 558.272 1319.99 590.037 1418.91 561.017C1543.35 510.046 1580.85 468.713 1771.42 286.097C2113.95 -43.9583 2292.5 148.949 2386.27 270.066"
                stroke="#5A4FA0"
                stroke-width="3"
            />
            <path
                d="M-63.6392 1019.69C-30.6989 1017.73 49.5414 1016.56 179.67 1020.4C326.071 1024.24 409.077 1010.77 532.147 933.197C670.331 843.235 709.291 728.313 784.81 674.693C855.218 621.073 938.363 618.31 1066.65 587.483C1198.86 552.99 1290.25 584.944 1389.45 559.683C1510.53 515.607 1559.03 474.678 1751.93 289.34C2105.15 -51.6861 2281.43 145.965 2374.77 271.766"
                stroke="#5E549A"
                stroke-width="3.14286"
            />
            <path
                d="M-62.3638 1030.7C-29.2371 1033.65 49.4581 1038.52 173.195 1042.61C310.493 1046.71 398.429 1031.44 520.538 951.628C659.108 858.493 696.748 747.953 764.945 690.758C828.883 633.563 903.524 621.01 1034.2 586.2C1169.8 547.706 1260.51 579.849 1360 558.347C1477.71 521.166 1537.21 480.642 1732.44 292.581C2096.34 -59.4159 2270.36 142.979 2363.27 273.464"
                stroke="#625A94"
                stroke-width="3.28571"
            />
            <path
                d="M-61.0884 1041.71C-27.7752 1049.58 49.3749 1060.47 166.72 1064.82C294.914 1069.17 387.781 1052.11 508.928 970.06C647.884 873.752 684.205 767.592 745.08 706.822C802.547 646.052 868.685 623.71 1001.76 584.917C1140.74 542.422 1230.77 574.754 1330.54 557.011C1444.9 526.724 1515.4 486.605 1712.95 295.822C2087.53 -67.1456 2259.29 139.994 2351.77 275.163"
                stroke="#665F8E"
                stroke-width="3.42857"
            />
            <path
                d="M-59.8135 1052.72C-26.3139 1065.51 49.2912 1082.43 160.245 1087.03C279.336 1091.64 377.133 1072.78 497.318 988.491C636.66 889.01 671.662 787.231 725.214 722.887C776.21 658.542 833.845 626.411 969.318 583.634C1111.68 537.138 1201.03 569.658 1301.08 555.675C1412.08 532.283 1493.58 492.569 1693.46 299.063C2078.73 -74.8753 2248.22 137.008 2340.27 276.861"
                stroke="#6A6588"
                stroke-width="3.57143"
            />
            <path
                d="M-51.4372 1078.78C-17.7512 1096.47 56.3088 1119.42 160.871 1124.29C270.858 1129.15 373.587 1108.49 492.809 1021.96C632.537 919.31 666.22 821.911 712.45 753.992C756.975 686.073 806.107 644.152 943.976 597.393C1089.71 546.895 1178.39 579.604 1278.73 569.38C1386.36 552.883 1478.86 513.574 1681.07 317.345C2077.02 -67.5638 2244.25 149.063 2335.87 293.6"
                stroke="#6E6B82"
                stroke-width="3.71429"
            />
            <path
                d="M-40.4578 1110.34C-6.58528 1132.96 65.9296 1161.93 164.101 1167.05C264.984 1172.17 372.643 1149.71 490.904 1060.95C631.018 955.124 663.381 862.106 702.288 790.612C740.343 719.118 780.972 667.408 921.237 616.665C1070.36 562.166 1158.35 595.064 1258.98 588.599C1363.25 578.997 1466.75 540.092 1671.28 341.141C2077.92 -54.7384 2242.89 166.632 2334.08 315.853"
                stroke="#72707C"
                stroke-width="3.85714"
            />
        </svg>
    )
}

export default ContactDna3
