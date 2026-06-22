import React from "react";
import "./Login.css";

const PacketLayer = () => {
  return (
    <svg
      viewBox="0 0 1939 1443"
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
        {/* ================= Component ANIMATION ================= */}

        <g className="componentAnimation">
            <rect x="205.103" y="914.066" width="472" height="329" fill="url(#pattern6_7301_3403)"></rect>
        </g>

        <g className="componentAnimation">
            <rect x="545.161" y="748" width="332.252" height="286.175" transform="rotate(26.8295 545.161 748)" fill="url(#pattern7_7301_3403)"></rect>
        </g>

        <g className="componentAnimation">
            <rect x="397.054" width="1727.96" height="551.814" transform="rotate(26.8295 397.054 0)" fill="url(#pattern5_7301_3403)"></rect>
        </g>


        {/* ================= FIRST ARROW ANIMATION ================= */}


        <g className="arrow-flow a1">
            <path 
                d="M527.506 1033.53L496.166 1051.33L484.307 1044.33L515.64 1028.03L505.815 1023.47L535.91 1023.47L535.91 1038.03L527.506 1033.53Z" fill="url(#paint8_linear_7301_3403)" stroke="#13D6F6"
            />
        </g>

        <g className="arrow-flow a2">
            <path 
                d="M527.506 1033.53L496.166 1051.33L484.307 1044.33L515.64 1028.03L505.815 1023.47L535.91 1023.47L535.91 1038.03L527.506 1033.53Z" fill="url(#paint8_linear_7301_3403)" stroke="#13D6F6"
            />
        </g>
        <g className="arrow-flow a3">
            <path 
                d="M527.506 1033.53L496.166 1051.33L484.307 1044.33L515.64 1028.03L505.815 1023.47L535.91 1023.47L535.91 1038.03L527.506 1033.53Z" fill="url(#paint8_linear_7301_3403)" stroke="#13D6F6"
            />
        </g>


      {/* Main Connection Path */}
      <path
        id="path1"
        d="M1397.36 1214.6C1396.49 1206.31 608 807.341 213.865 608.891"
        fill="none"
      />

      {/* CENTER → LEFT PACKETS */}
      <circle className="packet" r="8" fill="#00E5FF">
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          keyPoints="0.55;1"
          keyTimes="0;1"
          calcMode="linear"
        >
          <mpath href="#path1" />
        </animateMotion>
      </circle>

      <circle className="packet" r="6" fill="#00E5FF">
        <animateMotion
          dur="4s"
          begin="1s"
          repeatCount="indefinite"
          keyPoints="0.55;1"
          keyTimes="0;1"
          calcMode="linear"
        >
          <mpath href="#path1" />
        </animateMotion>
      </circle>

      <circle className="packet" r="6" fill="#00E5FF">
        <animateMotion
          dur="4s"
          begin="2s"
          repeatCount="indefinite"
          keyPoints="0.55;1"
          keyTimes="0;1"
          calcMode="linear"
        >
          <mpath href="#path1" />
        </animateMotion>
      </circle>

      {/* CENTER → RIGHT PACKETS */}
      <circle className="packet" r="8" fill="#00E5FF">
        <animateMotion
          dur="3.5s"
          repeatCount="indefinite"
          keyPoints="0.5;0"
          keyTimes="0;1"
          calcMode="linear"
        >
          <mpath href="#path1" />
        </animateMotion>
      </circle>

      <circle className="packet" r="6" fill="#00E5FF">
        <animateMotion
          dur="3.5s"
          begin="1s"
          repeatCount="indefinite"
          keyPoints="0.5;0"
          keyTimes="0;1"
          calcMode="linear"
        >
          <mpath href="#path1" />
        </animateMotion>
      </circle>

      <circle className="packet" r="6" fill="#00E5FF">
        <animateMotion
          dur="3.5s"
          begin="2s"
          repeatCount="indefinite"
          keyPoints="0.5;0"
          keyTimes="0;1"
          calcMode="linear"
        >
          <mpath href="#path1" />
        </animateMotion>
      </circle>

      
      {/* ================= LEFT ARROW ANIMATION ================= */}


        <g className="arrow-flow a1">
            <path
                d="M245.506 590.95L214.166 608.751L202.307 601.748L233.64 585.45L223.815 580.896L253.91 580.896L253.91 595.45L245.506 590.95Z"
                fill="url(#paint0_linear_7301_3403)"
                stroke="#13D6F6"
            />
        </g>

        <g className="arrow-flow a2">
            <path
                d="M245.506 590.95L214.166 608.751L202.307 601.748L233.64 585.45L223.815 580.896L253.91 580.896L253.91 595.45L245.506 590.95Z"
                fill="url(#paint0_linear_7301_3403)"
                stroke="#13D6F6"
            />
        </g>

        <g className="arrow-flow a3">
            <path
                d="M245.506 590.95L214.166 608.751L202.307 601.748L233.64 585.45L223.815 580.896L253.91 580.896L253.91 595.45L245.506 590.95Z"
                fill="url(#paint0_linear_7301_3403)"
                stroke="#13D6F6"
            />
        </g>

        {/* ================= MIDDLE ARROW ANIMATION ================= */}

        <g className="arrow-flow a1">
            <path
                d="M811.564 876.018L781.267 895.541L769.035 889.211L799.41 871.189L789.345 867.191L819.394 865.511L820.206 880.042L811.564 876.018Z"
                fill="url(#paint1_linear_7301_3403)"
                stroke="#13D6F6"
            />
        </g>

        <g className="arrow-flow a2">
            <path
                d="M811.564 876.018L781.267 895.541L769.035 889.211L799.41 871.189L789.345 867.191L819.394 865.511L820.206 880.042L811.564 876.018Z"
                fill="url(#paint1_linear_7301_3403)"
                stroke="#13D6F6"
            />
        </g>

        <g className="arrow-flow a3">
            <path
                d="M811.564 876.018L781.267 895.541L769.035 889.211L799.41 871.189L789.345 867.191L819.394 865.511L820.206 880.042L811.564 876.018Z"
                fill="url(#paint1_linear_7301_3403)"
                stroke="#13D6F6"
            />
        </g>

        {/* ================= RIGHT ARROW ANIMATION ================= */}

        <g className="arrow-flow a1">
            <path 
                d="M1429.51 1196.95L1398.17 1214.75L1386.31 1207.75L1417.64 1191.45L1407.81 1186.9L1437.91 1186.9L1437.91 1201.45L1429.51 1196.95Z" fill="url(#paint2_linear_7301_3403)" stroke="#13D6F6"
            />
        </g>

        <g className="arrow-flow a2">
            <path 
                d="M1429.51 1196.95L1398.17 1214.75L1386.31 1207.75L1417.64 1191.45L1407.81 1186.9L1437.91 1186.9L1437.91 1201.45L1429.51 1196.95Z" fill="url(#paint2_linear_7301_3403)" stroke="#13D6F6"
            />
        </g>

        <g className="arrow-flow a3">
            <path 
                d="M1429.51 1196.95L1398.17 1214.75L1386.31 1207.75L1417.64 1191.45L1407.81 1186.9L1437.91 1186.9L1437.91 1201.45L1429.51 1196.95Z" fill="url(#paint2_linear_7301_3403)" stroke="#13D6F6"
            />
        </g>

        {/* ================= LINE ANIMATION ================= */}
        <path 
            id="path2"
            d="M1127 842.998C1127.41 843.236 1170.28 817.756 1191.66 804.986" stroke="#1AC5FA"
        />
        <circle className="packet" r="6" fill="#00E5FF">
            <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.2;0.8;1"
                dur="3s"
                repeatCount="indefinite"
            />

            <animateMotion
                dur="3s"
                repeatCount="indefinite"
                calcMode="linear"
            >
                <mpath href="#path2" />
            </animateMotion>
        </circle>

        {/* ================= ARROW ANIMATION ================= */}

        <g className="arrow-flow a1">
            <path 
                d="M1227.18 791.527L1195.84 809.328L1183.98 802.325L1215.32 786.027L1205.49 781.473L1235.59 781.473L1235.59 796.027L1227.18 791.527Z" fill="url(#paint7_linear_7301_3403)" stroke="#13D6F6"
            />
        </g>
        <g className="arrow-flow a1">
            <path 
                d="M1227.18 791.527L1195.84 809.328L1183.98 802.325L1215.32 786.027L1205.49 781.473L1235.59 781.473L1235.59 796.027L1227.18 791.527Z" fill="url(#paint7_linear_7301_3403)" stroke="#13D6F6"
            />
        </g>
        <g className="arrow-flow a1">
            <path 
                d="M1227.18 791.527L1195.84 809.328L1183.98 802.325L1215.32 786.027L1205.49 781.473L1235.59 781.473L1235.59 796.027L1227.18 791.527Z" fill="url(#paint7_linear_7301_3403)" stroke="#13D6F6"
            />
        </g>

        {/* ================= LINE ANIMATION ================= */}
        <path 
            id="path3"
            d="M959.997 660.468C959.876 659.319 850.525 603.988 795.865 576.466" stroke="#1AC5FA"
        />
        <circle className="packet" r="6" fill="#00E5FF">
            <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.2;0.8;1"
                dur="3s"
                repeatCount="indefinite"
            />

            <animateMotion
                dur="3s"
                repeatCount="indefinite"
                calcMode="linear"
            >
                <mpath href="#path3" />
            </animateMotion>
        </circle>

        {/* ================= ARROW ANIMATION ================= */}
        <g className="arrow-flow a1">
            <path 
                d="M827.506 558.527L796.166 576.328L784.307 569.325L815.64 553.027L805.815 548.473L835.91 548.473L835.91 563.027L827.506 558.527Z" fill="url(#paint4_linear_7301_3403)" stroke="#13D6F6"
            />
        </g>
        <g className="arrow-flow a1">
            <path 
                d="M827.506 558.527L796.166 576.328L784.307 569.325L815.64 553.027L805.815 548.473L835.91 548.473L835.91 563.027L827.506 558.527Z" fill="url(#paint4_linear_7301_3403)" stroke="#13D6F6"
            />
        </g>
        <g className="arrow-flow a1">
            <path 
                d="M827.506 558.527L796.166 576.328L784.307 569.325L815.64 553.027L805.815 548.473L835.91 548.473L835.91 563.027L827.506 558.527Z" fill="url(#paint4_linear_7301_3403)" stroke="#13D6F6"
            />
        </g>

        {/* ================= LINE ANIMATION ================= */}
        <path 
            id="path4"
            d="M506 411C506.8 411.4 592.333 368.5 635 347" stroke="#1AC5FA"
        />
        <circle className="packet" r="6" fill="#00E5FF">
            <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.2;0.8;1"
                dur="3s"
                repeatCount="indefinite"
            />

            <animateMotion
                dur="3s"
                repeatCount="indefinite"
                calcMode="linear"
            >
                <mpath href="#path4" />
            </animateMotion>
        </circle>

        {/* ================= ARROW ANIMATION ================= */}
        <g className="arrow-flow2 a12">
            <path 
                d="M672 355L646 341L635 346.441L661.5 360L653.5 365L685.5 367.5L679 350.959L672 355Z" fill="url(#paint3_linear_7301_3403)" stroke="#13D6F6"
            />
        </g>
        <g className="arrow-flow2 a12">
            <path 
                d="M672 355L646 341L635 346.441L661.5 360L653.5 365L685.5 367.5L679 350.959L672 355Z" fill="url(#paint3_linear_7301_3403)" stroke="#13D6F6"
            />
        </g>
        <g className="arrow-flow2 a12">
            <path 
                d="M672 355L646 341L635 346.441L661.5 360L653.5 365L685.5 367.5L679 350.959L672 355Z" fill="url(#paint3_linear_7301_3403)" stroke="#13D6F6"
            />
        </g>


        {/* ================= LINE ANIMATION ================= */}
        <path 
            id="path5"
            d="M1588 975.468C1588.12 974.319 1697.47 918.988 1752.13 891.466" stroke="#1AC5FA"
        />

        <circle className="packet" r="6" fill="#00E5FF">
            <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.2;0.8;1"
                dur="3s"
                repeatCount="indefinite"
            />

            <animateMotion
                dur="3s"
                repeatCount="indefinite"
                calcMode="linear"
            >
                <mpath href="#path5" />
            </animateMotion>
        </circle>

        {/* ================= ARROW ANIMATION ================= */}
        <g className="arrow-flow3 a13">
            <path 
                d="M1720.49 873.527L1751.83 891.328L1763.69 884.325L1732.36 868.027L1742.19 863.473L1712.09 863.473L1712.09 878.027L1720.49 873.527Z" fill="url(#paint5_linear_7301_3403)" stroke="#13D6F6"
            />
        </g>
        <g className="arrow-flow3 a13">
            <path 
                d="M1720.49 873.527L1751.83 891.328L1763.69 884.325L1732.36 868.027L1742.19 863.473L1712.09 863.473L1712.09 878.027L1720.49 873.527Z" fill="url(#paint5_linear_7301_3403)" stroke="#13D6F6"
            />
        </g>
        <g className="arrow-flow3 a13">
            <path 
                d="M1720.49 873.527L1751.83 891.328L1763.69 884.325L1732.36 868.027L1742.19 863.473L1712.09 863.473L1712.09 878.027L1720.49 873.527Z" fill="url(#paint5_linear_7301_3403)" stroke="#13D6F6"
            />
        </g>

        {/* ================= STATIC BIDIRECTIONAL ARROW ================= */}

        <path
            d="M1185.71 585.351C1188.32 583.364 1193.55 579.281 1193.52 578.844L1223.76 594.492L1215.37 599.94L1249.81 600.544L1241.57 583.534L1234.68 588.341L1203.93 572.725L1210.82 567.917L1179 568.246L1185.71 585.351Z"
            fill="url(#paint6_linear_7301_3403)"
            stroke="#13D6F6"
        />

        {/* ================= LEFT MOVING HEAD ================= */}

        <g className="bi-left-head">
            <path
                d="M1185.71 585.351C1188.32 583.364 1193.55 579.281 1193.52 578.844L1223.76 594.492L1215.37 599.94L1249.81 600.544L1241.57 583.534L1234.68 588.341L1203.93 572.725L1210.82 567.917L1179 568.246L1185.71 585.351Z"
                fill="url(#paint6_linear_7301_3403)"
                stroke="#13D6F6"
                clipPath="url(#leftClip)"
            />
        </g>

        {/* ================= RIGHT MOVING HEAD ================= */}

        <g className="bi-right-head">
            <path
                d="M1185.71 585.351C1188.32 583.364 1193.55 579.281 1193.52 578.844L1223.76 594.492L1215.37 599.94L1249.81 600.544L1241.57 583.534L1234.68 588.341L1203.93 572.725L1210.82 567.917L1179 568.246L1185.71 585.351Z"
                fill="url(#paint6_linear_7301_3403)"
                stroke="#13D6F6"
                clipPath="url(#rightClip)"
            />
        </g>

        {/* ================= CLIP PATHS ================= */}

        <defs>
            {/* Arrow spans roughly x = 1179 → 1250 */}
            {/* Midpoint ≈ 1214 */}

            <clipPath id="leftClip">
                <rect
                x="1178"
                y="565"
                width="36"
                height="40"
                />
            </clipPath>

            <clipPath id="rightClip">
                <rect
                x="1214"
                y="565"
                width="40"
                height="40"
                />
            </clipPath>
        </defs>


      <defs>
        <filter id="packetGlow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

export default PacketLayer;