import type { Annotation } from '$lib/types';

export function createAnnotation(resourceId: string, page: number, position: {x: number, y: number}): Annotation {
  return {
    id: crypto.randomUUID(),
    resourceId,
    page,
    position,
    content: '',
    color: '#ffeb3b',
    createdAt: new Date().toISOString()
  };
}

export function serializeAnnotations(annotations: Annotation[]): string {
  return JSON.stringify(annotations.map(ann => ({
    ...ann,
    position: {
      x: Math.round(ann.position.x),
      y: Math.round(ann.position.y)
    }
  })));
}