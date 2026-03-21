from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any, Dict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]


def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Returns True if the graph formed by nodes and edges is a
    Directed Acyclic Graph (DAG). Uses iterative DFS with a
    colour-marking scheme (WHITE=0, GRAY=1, BLACK=2).
    """
    node_ids = {n['id'] for n in nodes}
    # Build adjacency list
    adj: Dict[str, List[str]] = {n['id']: [] for n in nodes}
    for edge in edges:
        src = edge.get('source')
        tgt = edge.get('target')
        if src in adj and tgt in node_ids:
            adj[src].append(tgt)

    WHITE, GRAY, BLACK = 0, 1, 2
    color = {n: WHITE for n in node_ids}

    for start in node_ids:
        if color[start] != WHITE:
            continue
        # Iterative DFS
        stack = [(start, iter(adj[start]))]
        color[start] = GRAY
        while stack:
            node, children = stack[-1]
            try:
                child = next(children)
                if color[child] == GRAY:
                    return False  # Back edge → cycle
                if color[child] == WHITE:
                    color[child] = GRAY
                    stack.append((child, iter(adj[child])))
            except StopIteration:
                color[node] = BLACK
                stack.pop()

    return True


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag_result = is_dag(pipeline.nodes, pipeline.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag_result,
    }
