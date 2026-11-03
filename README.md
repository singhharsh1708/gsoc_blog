# Harsh Singh — GSoC 2026 @ SciML

🔗 **Live Portfolio & Devlog:** [singhharsh1708.github.io/gsoc_blog](https://singhharsh1708.github.io/gsoc_blog/)

## Google Summer of Code 2026 (completed)

**Project:** Native Julia ODE, SDE, DAE, DDE, and PDE Solvers  
**Organization:** SciML (NumFOCUS)  
**Mentors:** Chris Rackauckas, Kanav Gupta, Utkarsh, Oscar Smith  
**Status:** completed August 31, 2026. Full write-up: [GSoC 2026 Final Report](https://singhharsh1708.github.io/gsoc_blog/blog/final-report.html)

### Overview

`OrdinaryDiffEq.jl` had grown solver by solver, with most families carrying their own hand-written `perform_step!`. The project moved those families onto generic tableau-driven implementations, so a new method is a tableau plus a constructor, and added the package's first multirate integrators with public work-precision benchmarks.

### What shipped

- **Multirate solvers:** MREEF, MRAB, MIS2, explicit and implicit MRI-GARK, and MREIL, split across `OrdinaryDiffEqMultirate` and `OrdinaryDiffEqMultirateImplicit`.
- **Tableau infrastructure:** symplectic, Verner, CFNLIRK3, ABDF2 and low-storage RK families on generic implementations, plus an order-condition test for every adaptive SDIRK and ESDIRK embedded pair.
- **New methods through that infrastructure:** Ralston4, the relaxation RK family, MSRK10, ARS, BHR, IMEX-SSP and ESDIRK3(2)5L[2]SA.
- **Benchmarks:** multirate work-precision diagrams in SciMLBenchmarks.jl.

Still open: registering `OrdinaryDiffEqMultirateImplicit`, MREIL in the benchmark notebook, and the MrGARK family ([#961](https://github.com/SciML/OrdinaryDiffEq.jl/issues/961)).

### After GSoC

Work continued on random ODE (RODE) solvers in OrdinaryDiffEq.jl, including a derivative-free order 1.5 Taylor method and convergence benchmarks, and on PETScDiffEq.jl.
