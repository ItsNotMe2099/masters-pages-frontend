export const reachGoal = (goal, params = null) => {
  try {
    if (typeof window !== 'undefined') {
      (window as any)?.ym(75081823, 'reachGoal', goal)
    }
  }catch (e){
    console.error(e);
  }
}
