import {IFormStep} from 'types/types'
import React, {useEffect, useMemo, useState} from 'react'
import RegistrationLayout from "components/for_pages/Registration/RegistrationLayout";
import {useRouter} from "next/router";
import FormStepSwitch from "components/ui/FormStepSwitch";
import CorporateRegEmailStep from "./CorporateRegEmailStep";
import CorporateRegContactsStep from "components/for_pages/CorporateRegistration/CorporateRegContactsStep";
import CorporateRegOrganizationStep from "components/for_pages/CorporateRegistration/CorporateRegOrganizationStep";
import CorporateRegFinishStep from "components/for_pages/CorporateRegistration/CorporateRegFinishStep";
import {useAppContext} from "context/state";
import OrganizationRepository from "data/repositories/OrganizationRepository";
import {OrganizationStatus} from "data/intefaces/IOrganization";
import Loader from "components/ui/Loader";


enum FormStep {
  Login = 'category',
  Contacts = 'contacts',
  Application = 'Application',
  Finish = 'finish',
}

const steps: IFormStep<FormStep>[] = [
  {
    name: 'Категория',
    description: null,
    key: FormStep.Login
  },
  {
    name: 'Описание',
    description: null,
    key: FormStep.Contacts
  },
  {
    name: 'Условия',
    description: null,
    key: FormStep.Application
  },
  {
    name: 'Расписание',
    description: null,
    key: FormStep.Finish
  },

]

interface Props {
  stepKey?: string
}

export default function CorporateRegPage(props: Props) {
  const appContext = useAppContext()
  const router = useRouter()
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState<IFormStep<FormStep>>(appContext.isLogged ? steps[1] : steps[0]);
  const currentStepIndex = useMemo(() => steps.findIndex(i => i.key === step.key) ?? 0, [step, steps])
  console.log("Data", appContext.profile)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(appContext.isLogged){
      OrganizationRepository.fetchCurrentOrganization().then((org) => {
        if(org?.status === OrganizationStatus.Moderation){
          setStep(steps[steps.length  -1]);
        }
        setLoading(false)
      });
    }else{
      setLoading(false)
    }
  }, [])
  useEffect(() => {
    if (props.stepKey) {
      setStep(steps.find(i => i.key === props.stepKey) ?? steps[0])
    }
  }, [props.stepKey])
  useEffect(() => {
    const step = steps.find(i => i.key === router.query.step as string as any)!
    if (step) {
      setStep(step)
    }
  }, [router.query.step])
  const setStepValue = async (stepKey: FormStep) => {
    const step = steps.find(i => i.key === stepKey)!
    setStep(step)
   /*await router.replace('/lk/owner/[profileRole]/listings/[id]/edit/[step]', Routes.lkOwnerListingEdit(profileRole, props.entityId, step.key as any), {
      shallow: true
    })*/
  }
  const handleNextStep = (formData?: any) => {
    if(formData){
      setFormData({...formData});
    }
    setStepValue(steps[currentStepIndex + 1].key)
  }
  const handleBack= (formData?: any) => {

    setStepValue(steps[currentStepIndex - 1].key)
  }

  return ( <RegistrationLayout>
    {loading ? <Loader/> : <FormStepSwitch index={currentStepIndex} options={[
        <CorporateRegEmailStep key={1} onNextStep={handleNextStep} />,
        <CorporateRegContactsStep key={2} onNextStep={handleNextStep} initialData={formData}  />,
        <CorporateRegOrganizationStep key={3} onNextStep={handleNextStep} initialData={formData} onBack={handleBack} />,
        <CorporateRegFinishStep key={4}/>
      ]} />}
  </RegistrationLayout>
  )
}
