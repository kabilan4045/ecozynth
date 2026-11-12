'use client'

import { useState } from 'react'

import { indiaStates } from '@/demo/data/india-states'
import { toast } from '@/demo/state/toast'
import { email, file, mobile, pincode, required } from '@/demo/validation'

import {
  CheckboxField,
  CheckboxGroup,
  DateField,
  FileField,
  OTPInput,
  RadioGroup,
  SelectField,
  SubmitButton,
  TextareaField,
  TextField,
} from '../forms/Fields'
import { useDemoForm } from '../forms/useDemoForm'
import { Accordion } from '../ui/Accordion'
import { Button } from '../ui/Button'
import { BottomSheet, Drawer, Modal } from '../ui/Overlay'
import { QuantityStepper } from '../ui/QuantityStepper'

/** Field states: normal, focus, error, disabled. */
export const FieldStates = () => {
  const [value, setValue] = useState('')
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <TextField label="Normal" name="sg-normal" required onChange={setValue} placeholder="Type here" value={value} />
      <TextField label="Focus" name="sg-focus" required onChange={() => {}} previewFocus value="Focused field" />
      <TextField
        error="Enter a valid 10-digit mobile number"
        label="Error"
        required
        name="sg-error"
        onChange={() => {}}
        prefix="+91"
        value="12345"
      />
      <TextField disabled required label="Disabled" name="sg-disabled" onChange={() => {}} value="Not editable" />
    </div>
  )
}

/** Live form using every field type and the shared validators. */
export const FormShowcase = () => {
  const [otp, setOtp] = useState('')
  const form = useDemoForm({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      pincode: '',
      state: '',
      source: '',
      problems: [] as string[],
      date: '',
      invoice: null as File | null,
      message: '',
      consent: false as boolean,
    },
    rules: {
      name: [required('Enter your name')],
      phone: [required('Enter your mobile number'), mobile()],
      email: [email()],
      pincode: [required('Enter your pincode'), pincode()],
      state: [required('Choose a state')],
      source: [required('Choose a water source')],
      invoice: [file({ types: ['pdf', 'jpg', 'jpeg', 'png'], maxMb: 5 })],
      consent: [required('Please accept to continue')],
    },
  })

  return (
    <form
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      id={form.formId}
      noValidate
      onSubmit={form.handleSubmit(() => {
        toast.success('Form is valid', 'Nothing was sent. This is the style guide.')
        form.reset()
      })}
    >
      <TextField {...form.field('name')} autoComplete="name" label="Full name" required />
      <TextField
        {...form.field('phone')}
        autoComplete="tel-national"
        inputMode="numeric"
        label="Mobile number"
        maxLength={10}
        prefix="+91"
        required
        type="tel"
      />
      <TextField {...form.field('email')} autoComplete="email" label="Email" type="email" />
      <TextField
        {...form.field('pincode')}
        autoComplete="postal-code"
        inputMode="numeric"
        label="Pincode"
        maxLength={6}
        required
        type="tel"
      />
      <SelectField {...form.field('state')} label="State" options={indiaStates} required />
      <DateField {...form.field('date')} label="Preferred date" />
      <RadioGroup
        {...form.field('source')}
        className="sm:col-span-2"
        columns={2}
        label="Water source"
        options={['Borewell', 'Municipal', 'Tanker', 'Mixed'].map((v) => ({ value: v, label: v }))}
        required
        variant="cards"
      />
      <CheckboxGroup
        {...form.field('problems')}
        className="sm:col-span-2"
        columns={3}
        label="Problems you notice"
        options={['Hair fall', 'Dry skin', 'White scaling', 'Stains', 'Bad taste/smell', 'Appliance damage']}
      />
      <FileField
        {...form.field('invoice')}
        accept=".pdf,.jpg,.jpeg,.png"
        className="sm:col-span-2"
        hint="PDF, JPG or PNG, up to 5 MB"
        label="Invoice"
      />
      <TextareaField
        {...form.field('message')}
        className="sm:col-span-2"
        label="Message"
        minLength={20}
        showCount
      />
      <div className="sm:col-span-2">
        <OTPInput label="OTP input (try pasting 123456)" onChange={setOtp} value={otp} />
      </div>
      <CheckboxField
        checked={form.values.consent}
        className="sm:col-span-2"
        error={form.errors.consent}
        label="I agree to be contacted about my request"
        name="consent"
        onBlur={form.field('consent').onBlur}
        onChange={(checked) => form.setValue('consent', checked)}
      />
      <div className="sm:col-span-2">
        <SubmitButton loading={form.submitting}>Submit test form</SubmitButton>
      </div>
    </form>
  )
}

/** Modal, drawer, bottom sheet, accordion, stepper and toasts. */
export const InteractiveShowcase = () => {
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [sheet, setSheet] = useState(false)
  const [qty, setQty] = useState(1)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => setModal(true)} variant="outline">
          Open modal
        </Button>
        <Button onClick={() => setDrawer(true)} variant="outline">
          Open drawer
        </Button>
        <Button onClick={() => setSheet(true)} variant="outline">
          Open bottom sheet
        </Button>
        <Button onClick={() => toast.success('Added to cart', 'ShowerPure 15-Stage Shower Filter')} variant="outline">
          Success toast
        </Button>
        <Button onClick={() => toast.error('Something went wrong', 'Please try again.')} variant="outline">
          Error toast
        </Button>
        <Button onClick={() => toast.action('Item removed', 'Undo', () => toast.info('Restored'))} variant="outline">
          Toast with undo
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted">Quantity stepper (max 5):</span>
        <QuantityStepper max={5} onChange={setQty} value={qty} />
      </div>
      <Accordion
        items={[
          { id: 'a', title: 'Accordion item one', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
          { id: 'b', title: 'Accordion item two', content: 'Sed do eiusmod tempor incididunt ut labore.' },
        ]}
      />

      <Modal
        description="Closes on Escape, overlay click or the close button. Full-screen on mobile."
        footer={<Button onClick={() => setModal(false)}>Done</Button>}
        fullScreenOnMobile
        onOpenChange={setModal}
        open={modal}
        title="Modal title"
      >
        <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Modal>
      <Drawer onOpenChange={setDrawer} open={drawer} side="right" title="Drawer">
        <p className="text-muted">Focus is trapped inside while open.</p>
      </Drawer>
      <BottomSheet
        footer={
          <div className="flex gap-3">
            <Button fullWidth onClick={() => setSheet(false)} variant="outline">
              Clear
            </Button>
            <Button fullWidth onClick={() => setSheet(false)}>
              Apply
            </Button>
          </div>
        }
        onOpenChange={setSheet}
        open={sheet}
        title="Filters"
      >
        <p className="text-muted">Mobile filters open in a bottom sheet like this.</p>
      </BottomSheet>
    </div>
  )
}
