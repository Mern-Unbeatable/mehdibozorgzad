import React, { memo } from 'react';
import { MapPin, Package, Info } from 'lucide-react';
import { displayLabel } from '../../../../utils/display';

const InfoRow = memo(({ icon: Icon, label, children }) => (
  <div className="flex gap-4 items-start">
    <div className="bg-[#f5f5f5] flex items-center justify-center w-10 h-10 rounded-lg shrink-0">
      <Icon size={18} className="text-[#696664]" />
    </div>
    <div className="flex flex-col gap-1 min-w-0 pt-0.5">
      <p className="font-['Lato'] font-semibold text-[#4c4946] text-sm md:text-base leading-tight">
        {label}
      </p>
      {children}
    </div>
  </div>
));
InfoRow.displayName = 'InfoRow';

const ProjectDetailSection = memo(({ project }) => (
  <section className="pt-14 md:pt-16 lg:pt-20">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-10 xl:gap-10 items-start">
        {/* Left — Before / After split image */}
        <div className="w-full lg:w-[41%] shrink-0 flex flex-col gap-2">
          {/* After — top half */}
          <div className="relative h-48 md:h-72 lg:h-[287px] rounded-t-2xl overflow-hidden">
            <img
              src={project.afterImg}
              alt={`${project.title} — after`}
              className="w-full h-full object-cover object-top"
            />
            <span className="absolute top-4 left-4 bg-white/95 text-[#696664] font-['Lato'] text-xs px-3.5 py-1 rounded-full shadow-xs">
              After
            </span>
          </div>
          {/* Before — bottom half */}
          <div className="relative h-48 md:h-72 lg:h-[287px] rounded-b-2xl overflow-hidden">
            <img
              src={project.beforeImg}
              alt={`${project.title} — before`}
              className="w-full h-full object-cover object-bottom"
            />
            <span className="absolute top-4 left-4 bg-white/95 text-[#696664] font-['Lato'] text-xs px-3.5 py-1 rounded-full shadow-xs">
              Before
            </span>
          </div>
        </div>

        {/* Right — Project info */}
        <div className="flex-1 flex flex-col gap-6 lg:gap-8 pt-1">
          {/* Title block */}
          <div className="flex flex-col gap-3">
            <p className="font-['Lato'] text-[#6b6b6b] text-sm md:text-base leading-normal tracking-wide">
              {project.serviceType}
            </p>
            <div className="flex flex-col gap-3">
              <h1 className="font-['Playfair_Display'] font-semibold text-[#0d0b0a] text-3xl md:text-4xl lg:text-[44px] leading-tight">
                {project.title}
              </h1>
              <p className="font-['Lato'] text-[#6b6b6b] text-sm md:text-base leading-relaxed max-w-2xl">
                {project.description}
              </p>
            </div>
          </div>

          {/* Meta info rows */}
          <div className="flex flex-col gap-6">
            {/* Location */}
            <InfoRow icon={MapPin} label="Location">
              <p className="font-['Lato'] text-[#696664] text-sm md:text-base leading-normal">
                {project.location}
              </p>
            </InfoRow>

            {/* Materials */}
            <InfoRow icon={Package} label="Materials">
              <div className="flex flex-wrap gap-2">
                {(project.materials ?? project.materialsUsed ?? []).length > 0 ? (
                  (project.materials ?? project.materialsUsed ?? []).map((mat, index) => (
                    <span
                      key={`${displayLabel(mat)}-${index}`}
                      className="border border-[#e5e7eb] text-[#696664] font-['Lato'] text-xs md:text-sm px-3.5 py-1.5 rounded-lg bg-white"
                    >
                      {displayLabel(mat)}
                    </span>
                  ))
                ) : (
                  <p className="font-['Lato'] text-[#696664] text-sm md:text-base leading-normal">
                    Not specified
                  </p>
                )}
              </div>
            </InfoRow>

            {/* Service Type */}
            <InfoRow icon={Info} label="Service Type">
              <p className="font-['Lato'] text-[#696664] text-sm md:text-base leading-normal">
                {project.serviceType}
              </p>
            </InfoRow>
          </div>
        </div>
      </div>
    </div>
  </section>
));

ProjectDetailSection.displayName = 'ProjectDetailSection';

export default ProjectDetailSection;
