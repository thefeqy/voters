import { useState } from "react";

const FlashMessage = ({ flash, type }: { flash: { message?: string }, type: 'success' | 'error' | 'warning' | 'info' }) => {

    const [flashMsg, setFlashMsg] = useState<string | null>(flash.message || null);

    const styles = {
        success: 'absolute top-24 right-6 bg-green-500 p-2 rounded-md shadow-lg text-sm text-white',
        error: 'absolute top-24 right-6 bg-rose-500 p-2 rounded-md shadow-lg text-sm text-white',
        warning: 'absolute top-24 right-6 bg-yellow-500 p-2 rounded-md shadow-lg text-sm text-black',
        info: 'absolute top-24 right-6 bg-blue-500 p-2 rounded-md shadow-lg text-sm text-white',
    }

    setTimeout(() => {
        setFlashMsg(null);
    }, 5000);

  return (
    <>
      {flashMsg && (
        <div className={styles[type]}>
            {flash.message}
        </div>
      )}
    </>
  )
}
export default FlashMessage
