import { BotEditPage } from '@/components/Features/bot/bot-edit-page'
import { Form, Formik } from 'formik'
// import React from 'react'

const BotSetting = () => {
  return (
    <div className='py-5 px-5 md:px-7 lg:px-[50px] bg-secondary flex flex-col gap-y-5 w-full'>
      <h2 className='font-bold text-2xl'>Settings</h2>

      <main  className="w-full bg-background rounded-lg p-6">
        <Formik initialValues={{}} onSubmit={() => {}}>
          <Form>
            <BotEditPage switchColor="data-[state=checked]:bg-blue-600" />
          </Form>
        </Formik>
      </main>
    </div>
  )
}

export default BotSetting