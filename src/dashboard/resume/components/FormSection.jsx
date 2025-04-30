import React, { useState } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <Button variant={"outline"} size={"sm"} className={"flex gap-2"}>
            <LayoutGrid /> Theme
          </Button>
        </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

     {activeFormIndex==1?  
        <PersonalDetail enabledNext={(v)=>setEnableNext(v)} />
        :activeFormIndex==2?
              <Summary enabledNext={(v)=>setEnableNext(v)} />
        : activeFormIndex==3?
        <Experience enabledNext={(v)=>setEnableNext(v)} />
  : null}
    </div>
  );
};

export default FormSection;
