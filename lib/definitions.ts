interface LanguageNode {
  name: string;
}

interface LanguageEdge {
  size: number;
  node: LanguageNode;
}

export interface Repository {
  name: string;
  languages?: {
    totalSize: number;
    edges?: (LanguageEdge | null)[] | null;
  } | null;
}
