import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    cytoscape: any;
  }
}

const CrowdDensitySimulator: React.FC = () => {
  const cyRef = useRef<any>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.24.0/cytoscape.min.js';
    script.onload = initializeSimulator;
    document.head.appendChild(script);

    return () => {
      if (cyRef.current) {
        cyRef.current.destroy();
      }
    };
  }, []);

  const initializeSimulator = () => {
    if (!window.cytoscape) return;

    const initialNodes = [
      { data: { id: "A", label: "A", density: 10 } },
      { data: { id: "B", label: "B", density: 3 } },
      { data: { id: "C", label: "C", density: 12 } },
      { data: { id: "D", label: "D", density: 8 } },
      { data: { id: "E", label: "E", density: 18 } },
      { data: { id: "F", label: "F", density: 2 } },
      { data: { id: "G", label: "G", density: 5 } }
    ];

    const initialEdges = [
      { data: { id: "e1", source: "A", target: "B" } },
      { data: { id: "e2", source: "A", target: "C" } },
      { data: { id: "e3", source: "B", target: "D" } },
      { data: { id: "e4", source: "C", target: "E" } },
      { data: { id: "e5", source: "B", target: "C" } },
      { data: { id: "e6", source: "C", target: "G" } },
      { data: { id: "e7", source: "G", target: "F" } },
      { data: { id: "e8", source: "E", target: "F" } },
      { data: { id: "e9", source: "D", target: "F" } },
      { data: { id: "e10", source: "A", target: "D" } }
    ];

    const cy = window.cytoscape({
      container: document.getElementById('cy'),
      elements: { nodes: initialNodes, edges: initialEdges },
      layout: { 
        name: 'cose',
        nodeRepulsion: 8000,
        idealEdgeLength: 120,
        padding: 60,
        randomize: false
      },
      style: [
        {
          selector: 'node',
          style: {
            'background-color': (ele: any) => highlightStyle(ele),
            'label': (ele: any) => ele.data('label') + '\n(' + ele.data('density') + ')',
            'color': '#2d3748',
            'text-valign': 'center',
            'text-halign': 'center',
            'border-width': 3,
            'shape': 'ellipse',
            'border-color': (ele: any) => ele.data('role') === 'alert' ? '#1977f3' : ele.data('role') === 'responder' ? '#f2b100' : '#666',
            'width': 90,
            'height': 90,
            'font-weight': 'bold',
            'font-size': '13px',
            'text-wrap': 'wrap',
            'text-max-width': '80px',
            'line-height': 1.2,
            'text-margin-y': 0,
            'transition-property': 'background-color, border-color, width, height',
            'transition-duration': '0.2s'
          }
        },
        {
          selector: 'node:hover',
          style: {
            'width': 100,
            'height': 100,
            'border-width': 4,
            'font-size': '14px'
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#a0aec0',
            'target-arrow-shape': 'none',
            'target-arrow-color': '#718096',
            'arrow-scale': 1.2,
            'curve-style': 'bezier',
            'opacity': 0.7,
            'transition-property': 'line-color, width, opacity, arrow-scale',
            'transition-duration': '0.3s'
          }
        },
        {
          selector: 'edge[path]',
          style: {
            'line-color': '#37c360',
            'width': 6,
            'target-arrow-shape': 'triangle',
            'target-arrow-color': '#37c360',
            'arrow-scale': 1.5,
            'opacity': 1
          }
        },
        {
          selector: ':selected',
          style: {
            'border-width': 5,
            'border-color': '#ff4757',
            'line-color': '#ff4757',
            'target-arrow-color': '#ff4757',
            'source-arrow-color': '#ff4757'
          }
        }
      ]
    });

    cyRef.current = cy;

    function highlightStyle(ele: any) {
      if (ele.data('path')) return "#bbf7d0";
      if (ele.data('role') === 'alert') return "#cce2ff";
      if (ele.data('role') === 'responder') return "#feefa3";
      return "#f8fafc";
    }

    function findShortestPath(nodes: any[], edges: any[], start: string, end: string) {
      const graph: { [key: string]: string[] } = {};
      const densityMap: { [key: string]: number } = {};
      
      nodes.forEach(node => {
        graph[node.id] = [];
        densityMap[node.id] = node.density;
      });
      
      edges.forEach(edge => {
        graph[edge.source].push(edge.target);
        graph[edge.target].push(edge.source);
      });
      
      const distances: { [key: string]: number } = {};
      const previous: { [key: string]: string | null } = {};
      const unvisited = new Set<string>();
      
      nodes.forEach(node => {
        distances[node.id] = Infinity;
        previous[node.id] = null;
        unvisited.add(node.id);
      });
      distances[start] = densityMap[start];
      
      while (unvisited.size > 0) {
        let current: string | null = null;
        for (let node of unvisited) {
          if (current === null || distances[node] < distances[current]) {
            current = node;
          }
        }
        
        if (current === end) break;
        if (current && distances[current] === Infinity) break;
        if (!current) break;
        
        unvisited.delete(current);
        
        for (let neighbor of graph[current] || []) {
          if (!unvisited.has(neighbor)) continue;
          
          const newDist = distances[current] + densityMap[neighbor];
          if (newDist < distances[neighbor]) {
            distances[neighbor] = newDist;
            previous[neighbor] = current;
          }
        }
      }
      
      if (previous[end] === null && start !== end) {
        return null;
      }
      
      const path = [];
      let current: string | null = end;
      while (current !== null) {
        path.unshift(current);
        current = previous[current];
      }
      
      return {
        path: path,
        totalDensity: distances[end]
      };
    }

    const alertSel = document.getElementById('alert') as HTMLSelectElement;
    const responderSel = document.getElementById('responder') as HTMLSelectElement;
    const atypeSel = document.getElementById('atype') as HTMLSelectElement;
    const densityNodeSel = document.getElementById('densityNode') as HTMLSelectElement;
    const densityInput = document.getElementById('densityVal') as HTMLInputElement;
    const pathInfo = document.getElementById('pathinfo') as HTMLSpanElement;
    const callBackend = document.getElementById('callBackend') as HTMLButtonElement;
    const updDensity = document.getElementById('updDensity') as HTMLButtonElement;
    const loadingSpan = document.getElementById('loading') as HTMLSpanElement;
    const exportBtn = document.getElementById('exportBtn') as HTMLButtonElement;
    const importBtn = document.getElementById('importBtn') as HTMLButtonElement;
    const importInput = document.getElementById('importInput') as HTMLInputElement;

    function updateAllSelectors() {
      const nodeIds = cy.nodes().map((n: any) => n.id()).sort();
      [alertSel, responderSel, densityNodeSel].forEach(sel => {
        if (sel) {
          sel.innerHTML = "";
          nodeIds.forEach((id: string) => {
            let opt = document.createElement('option');
            opt.value = id;
            opt.innerText = id;
            sel.appendChild(opt);
          });
        }
      });
      if (alertSel) alertSel.value = alertSel.value || nodeIds[0];
      if (responderSel) responderSel.value = responderSel.value || nodeIds[1] || nodeIds[0];
      if (densityNodeSel) densityNodeSel.value = densityNodeSel.value || nodeIds[0];
      
      const selectedNode = cy.getElementById(densityNodeSel?.value);
      if (selectedNode && selectedNode.length > 0 && densityInput) {
        densityInput.value = selectedNode.data('density') ?? 0;
      }
    }

    function setRoles(alert: string, responder: string, alertType: string) {
      cy.nodes().forEach((n: any) => n.data('role', null));
      if (alert && cy.getElementById(alert).length > 0) {
        cy.getElementById(alert).data('role', 'alert'); 
        cy.getElementById(alert).data('atype', alertType);
      }
      if (responder && cy.getElementById(responder).length > 0) {
        cy.getElementById(responder).data('role', 'responder');
      }
      cy.style().update();
    }

    function updatePathFromBackend() {
      if (loadingSpan) loadingSpan.style.display = 'inline';
      if (pathInfo) pathInfo.innerHTML = '';
      cy.edges().forEach((e: any) => e.data('path', false));
      cy.nodes().forEach((n: any) => n.data('path', false));

      setTimeout(() => {
        try {
          const nodes = cy.nodes().map((n: any) => ({ id: n.id(), density: n.data('density') }));
          const edges = cy.edges().map((e: any) => ({ source: e.source().id(), target: e.target().id() }));
          const start = alertSel?.value;
          const end = responderSel?.value;

          if (!start || !end) {
            if (pathInfo) pathInfo.innerHTML = "<span style='color:#dc2626;font-weight:600;'>Please select alert and responder!</span>";
            return;
          }

          const result = findShortestPath(nodes, edges, start, end);
          
          if (!result) {
            if (pathInfo) pathInfo.innerHTML = "<span style='color:#dc2626;font-weight:600;'>No path found!</span>";
          } else {
            const pathStr = `<span style='color:#059669;font-weight:600;'>${result.path.join(' → ')}</span><br><span style='color:#6b7280;font-size:12px;'>Total Density: ${result.totalDensity}</span>`;
            if (pathInfo) pathInfo.innerHTML = pathStr;
            
            // Highlight path nodes
            result.path.forEach((nodeId: string) => {
              cy.getElementById(nodeId).data('path', true);
            });
            
            // Highlight ALL edges along the path
            for (let i = 0; i < result.path.length - 1; i++) {
              const src = result.path[i];
              const tgt = result.path[i + 1];
              
              // Get all edges between these nodes (in both directions)
              const edges = cy.getElementById(src).edgesTo(cy.getElementById(tgt))
                .add(cy.getElementById(tgt).edgesTo(cy.getElementById(src)));
              
              edges.forEach((edge: any) => {
                edge.data('path', true);
              });
            }
          }
        } catch (e: any) {
          if (pathInfo) pathInfo.innerHTML = `<span style="color:#dc2626;font-weight:600;">Error: ${e.message}</span>`;
          console.error("Pathfinding error:", e);
        }
        
        cy.style().update();
        if (loadingSpan) loadingSpan.style.display = 'none';
      }, 100);
    }

    if (exportBtn) {
      exportBtn.onclick = () => {
        const obj = {
          nodes: cy.nodes().map((n: any) => ({ id: n.id(), density: n.data('density') })),
          edges: cy.edges().map((e: any) => ({ source: e.source().id(), target: e.target().id() }))
        };
        const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "graph.json";
        a.click();
        URL.revokeObjectURL(url);
      };
    }

    if (importBtn) importBtn.onclick = () => importInput?.click();
    if (importInput) {
      importInput.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            const data = JSON.parse(ev.target?.result as string);
            cy.elements().remove();
            cy.add(data.nodes.map((n: any) => ({ group: "nodes", data: { ...n, label: n.id } })));
            cy.add(data.edges.map((e: any, i: number) => ({ group: "edges", data: { ...e, id: `e${i}` } })));
            cy.layout({ name: "cose" }).run();
            setTimeout(() => {
              updateAllSelectors();
              updatePathFromBackend();
            }, 100);
          } catch (err: any) {
            alert("Error loading file: " + err.message);
          }
        };
        reader.readAsText(file);
      };
    }

    if (callBackend) callBackend.onclick = updatePathFromBackend;

    if (updDensity) {
      updDensity.onclick = () => {
        let node = cy.getElementById(densityNodeSel?.value);
        if (!node || node.length === 0) return;
        node.data('density', Number(densityInput?.value));
        node.style('label', `${node.data('label')}\n(${node.data('density')})`);
        updatePathFromBackend();
      };
    }

    if (alertSel) {
      alertSel.onchange = () => { 
        setRoles(alertSel.value, responderSel?.value || '', atypeSel?.value || 'smoke');
        updatePathFromBackend();
      };
    }
    if (responderSel) {
      responderSel.onchange = () => { 
        setRoles(alertSel?.value || '', responderSel.value, atypeSel?.value || 'smoke');
        updatePathFromBackend();
      };
    }
    if (atypeSel) {
      atypeSel.onchange = () => { 
        setRoles(alertSel?.value || '', responderSel?.value || '', atypeSel.value);
        updatePathFromBackend();
      };
    }
    if (densityNodeSel) {
      densityNodeSel.onchange = (e) => {
        let node = cy.getElementById((e.target as HTMLSelectElement).value);
        if (node && node.length > 0 && densityInput) {
          densityInput.value = node.data('density');
        }
      };
    }

    cy.on('tap', (evt: any) => {
      if (evt.target === cy) {
        let id = "N" + Math.floor(Math.random() * 10000);
        cy.add({ group: "nodes", data: { id, label: id, density: 5 }, position: evt.position });
        setTimeout(() => { updateAllSelectors(); updatePathFromBackend(); }, 0);
      }
    });

    cy.on('tapdrag', 'node', (e: any) => {
      let sel = e.target;
      let pos = e.position;
      let tgt = cy.nodes().filter((n: any) => n.id() !== sel.id() && Math.hypot(n.position('x') - pos.x, n.position('y') - pos.y) < 30);
      if (tgt.length > 0) {
        tgt = tgt[0];
        if (!cy.edges().some((ed: any) => 
              (ed.source().id() === sel.id() && ed.target().id() === tgt.id()) ||
              (ed.source().id() === tgt.id() && ed.target().id() === sel.id())
            )) {
          cy.add({ group: "edges", data: { id: `e${Date.now()}`, source: sel.id(), target: tgt.id() } });
          setTimeout(updatePathFromBackend, 100);
        }
      }
    });

    cy.on('select', 'node,edge', () => {
      document.onkeydown = (e) => {
        if (e.key === "Delete" || e.key === "Backspace") {
          cy.remove(cy.$(':selected'));
          updateAllSelectors();
          updatePathFromBackend();
          e.preventDefault();
        }
      };
    });
    cy.on('unselect', 'node,edge', () => { document.onkeydown = null; });

    updateAllSelectors();
    setRoles(alertSel?.value || 'A', responderSel?.value || 'B', atypeSel?.value || 'smoke');
    setTimeout(updatePathFromBackend, 500);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex">
      {/* Control Panel */}
      <div className="w-80 bg-white/95 backdrop-blur-sm shadow-2xl border-r border-gray-200/50 flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl">🗺️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Crowd Density Simulator</h1>
              <p className="text-blue-100 text-sm opacity-90">Real-time pathfinding system</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gradient-to-b from-white to-gray-50">
          {/* Alert Configuration */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200/50 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🚨</span>
              </div>
              <h3 className="font-bold text-blue-800">Alert Configuration</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                <select id="alert" className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white shadow-sm transition-all"></select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Alert Type</label>
                <select id="atype" className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white shadow-sm transition-all">
                  <option value="smoke">💨 Smoke</option>
                  <option value="fire">🔥 Fire</option>
                  <option value="violence">⚠️ Violence</option>
                </select>
              </div>
            </div>
          </div>

          {/* Responder Configuration */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200/50 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">🚑</span>
              </div>
              <h3 className="font-bold text-orange-800">Emergency Responder</h3>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Current Location</label>
              <select id="responder" className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white shadow-sm transition-all"></select>
            </div>
          </div>

          {/* Density Editor */}
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 border border-gray-200/50 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">📊</span>
              </div>
              <h3 className="font-bold text-gray-800">Crowd Density Editor</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Select Node</label>
                <select id="densityNode" className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 bg-white shadow-sm transition-all"></select>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Density Value</label>
                  <input type="number" min="0" max="100" id="densityVal" defaultValue="10" 
                    className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900 bg-white shadow-sm transition-all" />
                </div>
                <div className="flex items-end">
                  <button id="updDensity" className="px-4 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all font-semibold shadow-lg transform hover:scale-105 active:scale-95">
                    Set
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <button id="callBackend" className="w-full py-4 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white rounded-xl font-bold text-lg hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 transition-all transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">🔄</span>
              <span>Calculate Optimal Path</span>
            </div>
          </button>

          {/* Import/Export */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200/50 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">💾</span>
              </div>
              <h3 className="font-bold text-purple-800">Graph Data</h3>
            </div>
            <div className="flex gap-2">
              <button id="exportBtn" className="flex-1 px-3 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all text-sm font-semibold shadow-lg transform hover:scale-105 active:scale-95">
                Export JSON
              </button>
              <input type="file" id="importInput" style={{display:'none'}} accept="application/json" />
              <button id="importBtn" className="flex-1 px-3 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all text-sm font-semibold shadow-lg transform hover:scale-105 active:scale-95">
                Import JSON
              </button>
            </div>
          </div>

          {/* Path Information */}
          <div className="bg-white rounded-xl p-4 border-2 border-gray-200/50 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">📍</span>
              </div>
              <h3 className="font-bold text-gray-800">Path Information</h3>
            </div>
            <div className="min-h-[80px] bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-100">
              <span id="pathinfo" className="text-sm font-medium text-gray-600 block leading-relaxed">Click "Calculate Optimal Path" to begin pathfinding</span>
              <span id="loading" className="text-orange-600 text-sm hidden ml-2">
                <span className="inline-flex items-center gap-1">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculating...
                </span>
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-200/50 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">💡</span>
              </div>
              <h3 className="font-bold text-indigo-800">Quick Guide</h3>
            </div>
            <ul className="text-sm text-gray-700 space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                <span><strong>Add Node:</strong> Click empty space</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                <span><strong>Create Edge:</strong> Drag between nodes</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                <span><strong>Delete:</strong> Select + Delete/Backspace</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Graph Visualization */}
      <div className="flex-1 relative">
        <div id="cy" className="w-full h-full"></div>
      </div>
    </div>
  );
};

export default CrowdDensitySimulator;