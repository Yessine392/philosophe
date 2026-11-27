/** Où trouver l'image d'un tableau. La version Artifact remplace ce module par des images intégrées. */
export function paintingSrc(id: string): string {
  return `/tableaux/${id}.webp`;
}
