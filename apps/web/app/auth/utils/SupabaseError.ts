export function handleSupabaseError(error: unknown) {
  if (!error) return;
  // 타입 좁히기
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const msg = (error as { message: string }).message;
    if (msg.includes('violates row-level security')) {
      alert('권한이 없어 저장할 수 없습니다.');
    } else if (msg.includes('duplicate key value')) {
      alert('이미 등록된 사용자입니다.');
    } else {
      alert('알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  } else {
    alert('알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.');
  }
}
