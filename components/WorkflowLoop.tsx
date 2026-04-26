"use client";
import { Database, Sparkles, Bell, UserCheck, RefreshCw } from "lucide-react";

const W = 820, H = 510;
const CX = 410, CY = 280, R = 155, NR = 38, HALO = 50;
const ICON_SIZE = 22, ICON_HALF = ICON_SIZE / 2;
const ICON_COLOR = "rgba(20,184,166,0.9)";

const steps = [
  { label: "Data Intake",  desc: "Canvas, SIS, attendance, advisor notes" },
  { label: "AI Analysis",  desc: "Pattern detection & risk scoring" },
  { label: "Alert",        desc: "Advisor dashboard notification" },
  { label: "Outreach",     desc: "Personalized student support plan" },
  { label: "Outcome",      desc: "Data feeds back to improve model" },
];

function toRad(deg: number) { return (deg * Math.PI) / 180; }

const positions = steps.map((_, i) => ({
  x: CX + R * Math.cos(toRad(i * 72 - 90)),
  y: CY + R * Math.sin(toRad(i * 72 - 90)),
}));

type Anchor = "middle" | "start" | "end";

// [name_dx, name_dy, anchor, desc_dx, desc_dy]
const labelCfg: [number, number, Anchor, number, number][] = [
  [0,    -76, "middle",  0,   -60],  // 0 top
  [58,    -9, "start",  58,    +9],  // 1 upper-right
  [0,    +60, "middle",  0,   +78],  // 2 lower-right
  [0,    +60, "middle",  0,   +78],  // 3 lower-left
  [-58,   -9, "end",   -58,   +9],   // 4 upper-left
];

const TEAL = "rgba(20,184,166,";

const icons = [
  <Database  key={0} size={ICON_SIZE} strokeWidth={1.6} color={ICON_COLOR} />,
  <Sparkles  key={1} size={ICON_SIZE} strokeWidth={1.6} color={ICON_COLOR} />,
  <Bell      key={2} size={ICON_SIZE} strokeWidth={1.6} color={ICON_COLOR} />,
  <UserCheck key={3} size={ICON_SIZE} strokeWidth={1.6} color={ICON_COLOR} />,
  <RefreshCw key={4} size={ICON_SIZE} strokeWidth={1.6} color={ICON_COLOR} />,
];

export default function WorkflowLoop() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full max-w-3xl mx-auto block"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker id="wf-head" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M1 1L7 4L1 7Z" fill={TEAL + "0.75)"} />
        </marker>
        <marker id="wf-head-loop" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M1 1L7 4L1 7Z" fill={TEAL + "0.4)"} />
        </marker>
        <radialGradient id="wf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={TEAL + "0.09)"} />
          <stop offset="100%" stopColor={TEAL + "0)"} />
        </radialGradient>
      </defs>

      {/* Background glow */}
      <ellipse cx={CX} cy={CY} rx={230} ry={210} fill="url(#wf-glow)" />

      {/* Decorative guide rings */}
      <circle cx={CX} cy={CY} r={85}  stroke={TEAL + "0.06)"} strokeWidth="1" />
      <circle cx={CX} cy={CY} r={125} stroke={TEAL + "0.05)"} strokeWidth="1" />
      <circle cx={CX} cy={CY} r={R}   stroke={TEAL + "0.04)"} strokeWidth="1" strokeDasharray="4 6" />

      {/* Center label */}
      <text x={CX} y={CY - 7} textAnchor="middle" fill={TEAL + "0.45)"}
        fontSize="9" fontWeight="700" letterSpacing="2.5" fontFamily="Oswald, monospace">FEEDBACK</text>
      <text x={CX} y={CY + 9} textAnchor="middle" fill={TEAL + "0.45)"}
        fontSize="9" fontWeight="700" letterSpacing="2.5" fontFamily="Oswald, monospace">LOOP</text>

      {/* Connection arrows */}
      {steps.map((_, i) => {
        const from = positions[i];
        const to   = positions[(i + 1) % steps.length];
        const dx = to.x - from.x, dy = to.y - from.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const nx = dx / dist, ny = dy / dist;
        const isLoop = i === steps.length - 1;
        return (
          <line
            key={i}
            x1={from.x + nx * (NR + 5)}  y1={from.y + ny * (NR + 5)}
            x2={to.x   - nx * (NR + 14)} y2={to.y   - ny * (NR + 14)}
            stroke={isLoop ? TEAL + "0.35)" : TEAL + "0.6)"}
            strokeWidth="1.5"
            strokeDasharray={isLoop ? "5 4" : undefined}
            markerEnd={isLoop ? "url(#wf-head-loop)" : "url(#wf-head)"}
          />
        );
      })}

      {/* Nodes */}
      {positions.map((pos, i) => {
        const [ndx, ndy, anchor, ddx, ddy] = labelCfg[i];
        return (
          <g key={i}>
            {/* Outer halo */}
            <circle cx={pos.x} cy={pos.y} r={HALO} fill={TEAL + "0.06)"} />
            {/* Node circle */}
            <circle cx={pos.x} cy={pos.y} r={NR} fill="#0c1126" stroke={TEAL + "0.55)"} strokeWidth="1.5" />
            {/* Lucide icon, top-left corner offset so it centers on node */}
            <g transform={`translate(${pos.x - ICON_HALF},${pos.y - ICON_HALF})`}>
              {icons[i]}
            </g>

            {/* Step name — closer to node */}
            <text
              x={pos.x + ndx}
              y={pos.y + ndy}
              textAnchor={anchor}
              dominantBaseline="middle"
              fill="#f1f5f9"
              fontSize="12.5"
              fontWeight="600"
            >
              {steps[i].label}
            </text>

            {/* Description — further from node */}
            <text
              x={pos.x + ddx}
              y={pos.y + ddy}
              textAnchor={anchor}
              dominantBaseline="middle"
              fill="#64748b"
              fontSize="10.5"
            >
              {steps[i].desc}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
