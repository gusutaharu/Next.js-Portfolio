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

export interface FormStateType {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  fields?: {
    name?: string;
    email?: string;
    content?: string;
  };
}
